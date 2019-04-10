import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bill } from 'src/app/core/model/bill.model';
import { BillService } from 'src/app/core/service/bill.service';
import { Amount } from 'src/app/core/model/amount.model';
import { BillItem } from 'src/app/core/model/billItem.model';
import { Subscription } from 'rxjs';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { PaymentService } from 'src/app/core/service/payment.service';
import { VendorService } from 'src/app/core/service/vendor.service';
import { Payment } from 'src/app/core/model/payment.model';
import { Vendor } from 'src/app/core/model/vendor.model';

const confirmMsg = 'Do you want to delete this Bill?';

@Component({
	selector: 'app-bill-details',
	templateUrl: './bill-details.component.html',
	styleUrls: [ './bill-details.component.scss' ],
	providers: [ ConfirmationService, MessageService ]
})
export class BillDetailsComponent implements OnInit {
	bills: Bill[] = [];
	private subscriptions: Array<Subscription> = [];
	tableHeaders: any[];
	msgs: Message[] = [];
	payment: Payment;
	vendor: Vendor;

	taxRate: number;
	discountRate: number;
	billAmount: Amount = new Amount();
	response: any;
	anyAmount: number = 0;
	totalAmount: number = 0;

	constructor(
		private _billService: BillService,
		private router: Router,
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private _paymentService: PaymentService,
		private _vendorService: VendorService
	) {}

	// billDetailsTableHeaders = [
	// 	'BillDate',
	// 	'Vendor',
	// 	'Sub Amount',
	// 	'Tax',
	// 	'Discount',
	// 	'Total Amount',
	// 	'Order Notes',
	// 	'Amount Pending',
	// 	'Actions'
	// ];

	ngOnInit() {
		this.getBills();

		this.tableHeaders = [
			{ field: 'billNumber', header: 'Bill No.' },
			{ field: 'billedDate', header: 'Billed Date' },
			{ field: 'vendorName', header: 'Vendor' },
			// { field: '', header: 'Sub Amount' },
			{ field: '', header: 'Tax' },
			{ field: '', header: 'Total Amount' },
			{ field: '', header: 'Amount Pending' }
		];
	}

	getBills() {
		this._billService.getBills().subscribe((response) => {
			this.bills = response;
		});
	}

	deleteBill(bill: Bill) {
		this._paymentService.getPaymentById(bill.paymentId).subscribe((paymentResponse) => {
			this.payment = paymentResponse;
			this._vendorService.getVendorById(this.payment.vendorId).subscribe((vendorResponse) => {
				vendorResponse.amountBalance =
					vendorResponse.amountBalance - bill.totalAmount + this.payment.amountPaid;
				this.vendor = vendorResponse;
				console.log('response.amountBalance', vendorResponse.amountBalance);
			});
		});

		this.confirmationService.confirm({
			message: 'Do you want to delete this item?',
			header: 'Delete Confirmation',
			icon: 'pi pi-info-circle',
			reject: () => {
				this.msgs = [ { severity: 'info', summary: 'Rejected', detail: 'You have rejected' } ];
			},
			accept: () => {
				this.msgs = [ { severity: 'info', summary: 'Confirmed', detail: 'Bill Deleted' } ];
				this._billService.deleteBill(bill);
				this._paymentService.deletePayment(this.payment);
				this._vendorService.updateVendor(this.vendor);
				this.messageService.add({ severity: 'success', summary: '', detail: 'Bill Deleted' });
			}
		});
	}

	editBill(billId: string) {
		this.router.navigate([ 'Bills/New Bill', billId ]);
	}

	getSubAmount(billItems: BillItem[]): string {
		this.anyAmount = 0;
		for (let billItem of billItems) {
			this.anyAmount += billItem.rate * billItem.quantity;
		}
		this.billAmount.subAmount = this.anyAmount.toFixed(2);
		return this.billAmount.subAmount;
	}

	getTaxAmount(billItems: BillItem[]): string {
		this.anyAmount = 0;
		for (let billItem of billItems) {
			this.anyAmount +=
				(billItem.tax['stateTax'] + billItem.tax['countryTax']) * 0.01 * billItem.rate * billItem.quantity;
		}
		this.billAmount.taxAmount = this.anyAmount.toFixed(2);
		return this.billAmount.taxAmount;
	}

	getDiscountAmount(billItems: BillItem[]): string {
		this.anyAmount = 0;
		for (let billItem of billItems) {
			this.anyAmount += (billItem.discount + billItem.offer) * 0.01 * billItem.rate * billItem.quantity;
		}
		this.billAmount.discountAmount = this.anyAmount.toFixed(2);
		return this.billAmount.discountAmount;
	}

	getTotalAmount(billItems: BillItem[]): string {
		this.totalAmount = 0;
		this.totalAmount =
			+this.getSubAmount(billItems) + +this.getTaxAmount(billItems) - +this.getDiscountAmount(billItems);
		return this.totalAmount.toFixed(2);
	}

	getPendingAmount(amountPaid: number): string {
		return (this.totalAmount - amountPaid).toFixed(2);
	}

	printBill(billId: string) {
		this.router.navigate([ 'Bills/Print Bill', billId ]);
	}
}
