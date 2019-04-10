import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BillItemModalComponent } from '../billItem-modal/billItem-modal.component';
import { Bill } from 'src/app/core/model/bill.model';
import { Amount } from 'src/app/core/model/amount.model';
import { BillService } from 'src/app/core/service/bill.service';
import { VendorService } from 'src/app/core/service/vendor.service';
import { BillItem } from 'src/app/core/model/billItem.model';
import { Vendor } from 'src/app/core/model/vendor.model';
import { OfferService } from 'src/app/core/service/offer.service';
import { Offer } from 'src/app/core/model/offer.model';
import { Payment } from 'src/app/core/model/payment.model';
import { PaymentService } from 'src/app/core/service/payment.service';
import { ItemService } from 'src/app/core/service/item.service';
import { isRegExp } from 'util';

// TODO: Add A save/Update prompt

@Component({
	selector: 'app-new-bill',
	templateUrl: './new-bill.component.html',
	styleUrls: [ './new-bill.component.scss' ]
})
export class NewBillComponent implements OnInit {
	tableHeaders: any[];
	bill: Bill;
	billItems: BillItem[] = [];
	billItem: BillItem;
	payment: Payment;
	itemMap: Map<string, number> = new Map();

	billId: string = '';
	vendorId: string = '';
	paymentId: string = '';
	paymentSystems: string[] = [ 'Cash', 'Credit', 'Cheque', 'Bank Transfer' ];

	vendors: Vendor[];
	vendor: Vendor;
	vendorName: string = '';
	currDate: Date = new Date();

	subAmount: number;
	taxAmount: number;
	discountAmount: number;
	offerAmount: number;
	totalAmount: number;
	taxRate: number;
	discountRate: number;
	offerRate: number;
	isBillPayment: boolean = true;

	billInputForm = this.fb.group({
		vendorId: [ '', Validators.required ],
		billedDate: [ this.currDate, Validators.required ],
		billNumber: new FormControl(''),
		orderNote: new FormControl(''),
		amountPaid: [ '', Validators.required ],
		paymentMethod: new FormControl(''),
		paymentRef: new FormControl('')
	});

	billAmount: Amount = new Amount();
	constructor(
		private location: Location,
		private modalService: NgbModal,
		private _billService: BillService,
		private _vendorService: VendorService,
		private _itemService: ItemService,
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private _paymentService: PaymentService
	) {}

	ngOnInit() {
		this.populateVendorDropDown();
		this.route.paramMap.subscribe((params) => {
			this.billId = params.get('id');
			if (this.billId) {
				this.getBill(params.get('id'));
			}
		});

		const date = new Date();
		let currentDate = date.toISOString().substring(0, 10);
		console.log(currentDate);
		this.billInputForm.patchValue({
			billedDate: currentDate
		});

		this.tableHeaders = [
			{ field: '', header: 'Particular' },
			{ field: '', header: 'Manufacturer' },
			{ field: '', header: 'Quantity' },
			{ field: '', header: 'Rate' },
			{ field: '', header: 'Amount' },
			{ field: '', header: 'Discount' },
			{ field: '', header: 'Tax' },
			{ field: '', header: 'Total' },
			{ field: '', header: 'Offers' },
			{ field: '', header: 'M.R.P' }
		];
	}

	get billedDate() {
		return this.billInputForm.get('billedDate');
	}

	get amountPaid() {
		return this.billInputForm.get('amountPaid');
	}

	get billNumber() {
		return this.billInputForm.get('billNumber');
	}

	openItemModal() {
		const modalRef = this.modalService.open(BillItemModalComponent, { size: 'lg', keyboard: true });
		modalRef.componentInstance.addItemEvent.subscribe((response: BillItem) => {
			this.billItem = new BillItem(
				response.itemId,
				response.itemName,
				response.itemHSN,
				response.manufacturer,
				response.batchNumber,
				response.expiryDate,
				response.quantity,
				response.rate,
				response.itemMRP,
				response.tax
			);
			this.billItem.discount = response.discount;
			this.billItem.offer = response.offer;
			this.billItem.packType = response.packType;
			this.itemMap.set(response.itemId, response.quantity);
			const billItem = Object.assign({}, this.billItem);
			this.billItems.push(billItem);
			this.calculateTotalCosts(this.billItems);
		});
	}

	getSubAmount(rate: number, qty: number): number {
		return rate * qty;
	}

	// getTaxAmount(rate: number,qty: number,taxRate: number){
	//   return taxRate*0.1*this.getSubAmount(rate,qty);
	// }
	//
	// getDiscountAmount(rate: number,qty: number,discountRate: number){
	//   return discountRate*0.1*this.getSubAmount(rate,qty);
	// }

	getTotalAmount(rate: number, qty: number, discountRate: number, taxRate: number) {
		return ((1 + (taxRate - discountRate) * 0.01) * this.getSubAmount(rate, qty)).toFixed(2);
	}

	getOfferDiscount(offer: number) {
		return offer.toFixed(2);
	}

	calculateTotalCosts(billItems: BillItem[]) {
		this.subAmount = this.taxAmount = this.discountAmount = this.offerAmount = this.totalAmount = this.taxRate = this.discountRate = this.offerRate = 0;

		for (let billItem of billItems) {
			this.taxRate = billItem.tax['stateTax'] + billItem.tax['countryTax'];
			this.discountRate = billItem.discount;
			this.offerRate = billItem.offer;
			this.subAmount += billItem.rate * billItem.quantity;
		}

		this.taxAmount += this.taxRate * 0.01 * this.subAmount;
		this.offerAmount += this.offerRate * 0.01 * this.subAmount;
		this.discountAmount += this.discountRate * 0.01 * this.subAmount;

		this.billAmount.subAmount = this.subAmount.toFixed(2);
		this.billAmount.taxAmount = this.taxAmount.toFixed(2);
		print;
		this.billAmount.discountAmount = (this.discountAmount + this.offerAmount).toFixed(2);
		this.billAmount.totalAmount = (+this.billAmount.subAmount +
			+this.billAmount.taxAmount -
			+this.billAmount.discountAmount).toFixed(2);
	}

	populateVendorDropDown() {
		this._vendorService.getVendors().subscribe((response) => {
			this.vendors = response;
		});
	}

	closeClicked() {
		this.location.back();
	}

	getBill(billId: string) {
		this._billService.getBillById(billId).subscribe((response) => {
			this.bill = new Bill(response.vendorId, response.billItems, response.billedDate, response.amountPaid);

			this.bill.orderNote = response.orderNote;
			this.bill.paymentMethod = response.paymentMethod;
			this.bill.paymentId = response.paymentId;
			this.bill.paymentRef = response.paymentRef;
			this.bill.billNumber = response.billNumber;
			this.billItems = this.bill.billItems;

			this.billInputForm.patchValue({
				vendorId: this.bill.vendorId,
				billedDate: this.bill.billedDate,
				billNumber: this.bill.billNumber,
				orderNote: this.bill.orderNote,
				amountPaid: this.bill.amountPaid,
				paymentMethod: this.bill.paymentMethod
			});

			this.paymentId = this.bill.paymentId;

			this.calculateTotalCosts(this.billItems);
		});
	}

	fetchVendorName(event: any) {
		this.vendorId = event.target.value;
		this.setVendorDetails(this.vendorId);
	}

	setVendorDetails(vendorId: string): Vendor {
		for (let vendor of this.vendors) {
			if (vendorId == vendor.id) {
				this.vendor = vendor;
			}
		}
		return this.vendor;
	}

	saveBill() {
		this.paymentId = this._paymentService.setPayment(this.getPaymentObj());
		this._billService.setBill(this.getBillObj());
		this._itemService.batchItemQuantityUpdate(this.itemMap);
		this.updateAccountBalance();
		this.closeClicked();
	}

	updateBill() {
		this._billService.updateBill(this.getBillObj());
		this._paymentService.updatePayment(this.getPaymentObj());
		this.closeClicked();
	}

	updateAccountBalance() {
		this.vendor.amountBalance += this.bill.totalAmount - this.bill.amountPaid;
		this._vendorService.updateVendor(this.vendor);
	}

	getPaymentObj(): Payment {
		this.payment = new Payment(
			this.billInputForm.get('vendorId').value,
			this.billInputForm.get('amountPaid').value,
			this.billInputForm.get('billedDate').value,
			this.isBillPayment,
			!this.isBillPayment
		);
		this.payment.paymentMethod = this.billInputForm.get('paymentMethod').value;
		this.payment.paymentRefNo = this.billInputForm.get('paymentRef').value;
		this.payment.billPaymentType = true;

		this.billItems = this.bill.billItems;

		for (let vendor of this.vendors) {
			if (this.vendorId == vendor.id) {
				this.payment.vendorName = vendor.name;
				this.payment.vendorContactName = vendor.contactPersonName;
				this.payment.vendorPhoneNumber = vendor.contactPersonPhoneNumber;
				break;
			}
		}

		if (this.billId) {
			this.payment.id = this.bill.paymentId;
		}
		const payment = Object.assign({}, this.payment);

		return payment;
	}

	getBillObj(): Bill {
		this.bill = new Bill(
			this.billInputForm.get('vendorId').value,
			this.billItems,
			this.billInputForm.get('billedDate').value,
			this.billInputForm.get('amountPaid').value
		);

		this.bill.paymentMethod = this.billInputForm.get('paymentMethod').value;
		this.bill.paymentRef = this.billInputForm.get('paymentRef').value;
		this.bill.orderNote = this.billInputForm.get('orderNote').value;
		this.bill.billNumber = this.billInputForm.get('billNumber').value;

		this.bill.paymentId = this.paymentId;

		if (this.billAmount != null) {
			this.bill.totalAmount = +this.billAmount.totalAmount;
			this.bill.totalTax = +this.billAmount.taxAmount;
			this.bill.totalDiscount = +this.billAmount.discountAmount;
		}

		this.bill.vendorName = this.setVendorDetails(this.billInputForm.get('vendorId').value).name;
		this.bill.id = this.billId;
		const bill = Object.assign({}, this.bill);
		return bill;
	}

	deleteItem(billItem: BillItem) {
		const index: number = this.billItems.indexOf(billItem);
		if (index !== -1) {
			this.billItems.splice(index, 1);
		}
	}

	editItem(billItem: BillItem) {
		const modalRef = this.modalService.open(BillItemModalComponent, { size: 'lg', keyboard: true });
		if (billItem) {
			modalRef.componentInstance.billItem = billItem;
		}
		modalRef.componentInstance.editItemEvent.subscribe((response: BillItem) => {
			this.billItem = response;
			for (let billItem of this.billItems) {
				if (this.billItem.itemId == billItem.itemId) {
					const index: number = this.billItems.indexOf(billItem);
					this.billItems[index] = this.billItem;
					break;
				}
			}
			this.calculateTotalCosts(this.billItems);
		});
	}

	navigateNewVendor() {
		this.router.navigateByUrl('/Bills/New Bill/New Vendor/New Vendor');
	}
}
