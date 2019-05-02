import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/core/model/invoice.model';
import { Amount } from 'src/app/core/model/amount.model';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { ClientService } from 'src/app/core/service/client.service';
import { InvoiceItem } from 'src/app/core/model/invoiceItem.model';
import { Client } from 'src/app/core/model/client.model';
import { Observable, of } from 'rxjs';
import { PaymentService } from 'src/app/core/service/payment.service';
import { Payment } from 'src/app/core/model/payment.model';
import { InvoiceItemModalComponent } from '../invoiceItem-modal/invoiceItem-modal.component';
import { Receipt } from 'src/app/core/model/receipt.model';
import { ReceiptService } from 'src/app/core/service/receipt.service';
import { ItemService } from 'src/app/core/service/item.service';
import { PriceList } from 'src/app/core/model/priceList.model';
import { PriceListService } from 'src/app/core/service/price-list.service';

// TODO: Add A save/Update prompt

@Component({
	selector: 'app-new-invoice',
	templateUrl: './new-invoice.component.html',
	styleUrls: [ './new-invoice.component.scss' ]
})
export class NewInvoiceComponent implements OnInit {
	invoice: Invoice;
	invoiceItems: InvoiceItem[] = [];
	invoiceItem: InvoiceItem;
	clients: Client[];
	priceLists: PriceList[];
	client: Client;
	currDate: Date = new Date();
	receipt: Receipt;
	itemMap: Map<string, number> = new Map();

	invoiceId: string = '';
	clientId: string = '';
	receiptId: string = '';

	paymentSystems: string[] = [ 'Cash', 'Credit', 'Cheque', 'Bank Transfer' ];

	tableHeaders: any[];

	subAmount: number;
	taxAmount: number;
	discountAmount: number;
	offerAmount: number;
	totalAmount: number;
	taxRate: number;
	discountRate: number;
	offerRate: number;
	priceListRate: number = 0;
	isInvoicePayment: boolean = true;

	invoiceAmount: Amount = new Amount();

	invoiceInputForm = this.fb.group({
		invoiceNumber: [ '' ],
		clientId: [ '', Validators.required ],
		priceListRate: new FormControl(''),
		invoicedDate: [ '', Validators.required ],
		orderNote: new FormControl(''),
		amountPaid: [ '', Validators.required ],
		paymentMethod: new FormControl(''),
		paymentRef: new FormControl('')
	});

	constructor(
		private location: Location,
		private modalService: NgbModal,
		private _invoiceService: InvoiceService,
		private _clientService: ClientService,
		private _itemService: ItemService,
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private _receiptService: ReceiptService,
		private _priceListService: PriceListService
	) {}

	ngOnInit() {
		this.generateInvoiceNumber();
		this.populateClientDropDown();
		this.populatePriceListsDropDown();
		this.getCurrentDate();

		this.route.paramMap.subscribe((params) => {
			this.invoiceId = params.get('id');
			if (this.invoiceId) {
				this.getInvoice(params.get('id'));
			}
		});

		this.tableHeaders = [
			{ field: '', header: 'Particular' },
			{ field: '', header: 'Manufacturer' },
			{ field: '', header: 'MRP' },
			{ field: '', header: 'Quantity' },
			{ field: '', header: 'Rate' },
			{ field: '', header: 'Discount' },
			{ field: '', header: 'Tax' },
			{ field: '', header: 'Amount' },
		];
	}

	getCurrentDate() {
		const currentDate = new Date().toISOString().substring(0, 10);
		this.invoiceInputForm.patchValue({
			invoicedDate: currentDate
		});
	}

	get invoicedDate() {
		return this.invoiceInputForm.get('invoicedDate');
	}

	get amountPaid() {
		return this.invoiceInputForm.get('amountPaid');
	}

	get invoiceNumber() {
		return this.invoiceInputForm.get('invoiceNumber');
	}

	openItemModal() {
		const modalRef = this.modalService.open(InvoiceItemModalComponent, { size: 'lg', keyboard: true });
		modalRef.componentInstance.addItemEvent.subscribe((response: InvoiceItem) => {
			this.invoiceItem = new InvoiceItem(
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
			this.invoiceItem.discount = response.discount;
			this.invoiceItem.offer = response.offer;
			this.invoiceItem.packType = response.packType;
			this.invoiceItem.taxrate = response.taxrate;
			this.itemMap.set(response.itemId, response.quantity);

			const invoiceItem = Object.assign({}, this.invoiceItem);

			console.log('openItemModal', invoiceItem);

			this.invoiceItems.push(invoiceItem);
			this.calculateTotalCosts(this.invoiceItems);
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

	getTotalAmount(subAmount: number, netRate: number) {
		return ((1 + netRate * 0.01) * subAmount).toFixed(2);
	}

	getOfferDiscount(offer: number) {
		return offer.toFixed(2);
	}


	calculateTotalCosts(invoiceItems: InvoiceItem[]) {
		this.subAmount = this.taxAmount = this.discountAmount = this.offerAmount = this.totalAmount = this.taxRate = this.discountRate = this.offerRate = 0;

		console.log("calculateTotalCosts->priceListRate",this.priceListRate);

		for (let invoiceItem of invoiceItems) {
			this.taxRate = invoiceItem.rate;
			this.discountRate = invoiceItem.discount;
			this.offerRate = invoiceItem.offer;
			this.subAmount += (invoiceItem.rate + this.priceListRate * 0.01 * invoiceItem.rate) * invoiceItem.quantity;
		}

		console.log("calculateTotalCosts",this.subAmount);

		this.taxAmount += this.taxRate * 0.01 * this.subAmount;
		this.offerAmount += this.offerRate * 0.01 * this.subAmount;
		this.discountAmount += this.discountRate * 0.01 * this.subAmount;

		this.invoiceAmount.subAmount = this.subAmount.toFixed(2);
		this.invoiceAmount.taxAmount = this.taxAmount.toFixed(2);
		this.invoiceAmount.discountAmount = (this.discountAmount + this.offerAmount).toFixed(2);

		var totalSum: number = +this.invoiceAmount.subAmount +
			+this.invoiceAmount.taxAmount -
			+this.invoiceAmount.discountAmount;

		this.invoiceAmount.roundOffAmount = (+totalSum.toPrecision(2) - totalSum).toFixed(2);
		this.invoiceAmount.totalAmount = (+totalSum.toPrecision(2)).toFixed(2);
	}

	populateClientDropDown() {
		this._clientService.getClients().subscribe((response) => {
			this.clients = response;
		});
	}

	populatePriceListsDropDown() {
		this._priceListService.getPriceLists().subscribe((response) => {
			this.priceLists = response;
		});
	}

	//Automatically Generates Invoice Id based on date/time;
	generateInvoiceNumber() {
		this._invoiceService.getInvoices().subscribe((response) => {
			let date = new Date();

			let counter = 0;
			let invoiceNumber =
				date.getFullYear().toString() +
				date.getMonth().toString() +
				date.getDate().toString() +
				date.getHours().toString() +
				counter;

			for (let invoice of response) {
				if (invoice.invoiceNumber == invoiceNumber) {
					counter++;
					invoiceNumber =
						date.getFullYear().toString() +
						date.getMonth().toString() +
						date.getDate().toString() +
						date.getHours().toString() +
						counter;
				}
			}
			this.invoiceInputForm.patchValue({
				invoiceNumber: invoiceNumber
			});
		});
	}

	closeClicked() {
		this.location.back();
	}

	getInvoice(invoiceId: string) {
		this._invoiceService.getInvoiceById(invoiceId).subscribe((response) => {
			this.invoice = new Invoice(
				response.clientId,
				response.invoiceItems,
				response.invoicedDate,
				response.amountPaid
			);
			this.invoice.orderNote = response.orderNote;
			this.invoice.paymentMethod = response.paymentMethod;
			this.invoice.receiptId = response.receiptId;
			this.invoice.invoiceNumber = response.invoiceNumber;
			this.invoice.paymentRef = response.paymentRef;
			this.invoiceItems = this.invoice.invoiceItems;

			this.invoiceInputForm.patchValue({
				invoiceId: this.invoice.invoiceNumber,
				clientId: this.invoice.clientId,
				invoicedDate: this.invoice.invoicedDate,
				orderNote: this.invoice.orderNote,
				amountPaid: this.invoice.amountPaid,
				paymentMethod: this.invoice.paymentMethod
			});

			this.receiptId = this.invoice.receiptId;

			this.calculateTotalCosts(this.invoiceItems);
		});
	}

	fetchClientName(event: any) {
		this.clientId = event.target.value;
		this.setClientDetails(this.clientId);
	}

	setPriceListRate(event: any){
		console.log("setPriceListRate",event.target.value);
		this.priceListRate = event.target.value;
		if(this.invoiceItems.length > 0){
			for(let invoiceItem of this.invoiceItems){
				invoiceItem.rate += this.priceListRate * 0.01 * invoiceItem.rate;
			}
			this.calculateTotalCosts(this.invoiceItems);
		}
		
	}

	setClientDetails(clientId: string): Client {
		this.clients.forEach((client) => {
			if (clientId == client.id) {
				this.client = client;
			}
		});

		return this.client;
	}

	saveInvoice() {
		this.receiptId = this._receiptService.setReceipt(this.getReceiptObj());
		this._invoiceService.setInvoice(this.getInvoiceObj());
		this._itemService.batchItemQuantityUpdate(this.itemMap);
		this.updateAccountBalance();
		this.closeClicked();
	}

	updateInvoice() {
		this._invoiceService.updateInvoice(this.getInvoiceObj());
		this._receiptService.updateReceipt(this.getReceiptObj());
		this.closeClicked();
	}

	updateAccountBalance() {
		this.client.amountBalance += this.invoice.totalAmount - this.invoice.amountPaid;
		this._clientService.updateClient(this.client);
	}

	/**
	 * @name getReceiptObj
	 * @returns Receipt
	 */
	getReceiptObj(): Receipt {
		this.receipt = new Receipt(
			this.invoiceInputForm.get('clientId').value,
			this.invoiceInputForm.get('amountPaid').value,
			this.invoiceInputForm.get('invoicedDate').value,
			this.isInvoicePayment,
			!this.isInvoicePayment
		);
		this.receipt.paymentMethod = this.invoiceInputForm.get('paymentMethod').value;
		this.receipt.paymentRefNo = this.invoiceInputForm.get('paymentRef').value;
		this.receipt.invoiceReceiptType = true;

		for (let client of this.clients) {
			if (this.clientId == client.id) {
				this.receipt.clientName = client.name;
				this.receipt.clientContactName = client.contactPersonName;
				this.receipt.clientPhoneNumber = client.contactPersonPhoneNumber;
				break;
			}
		}

		if (this.invoiceId) {
			this.receipt.id = this.invoice.receiptId;
		}

		const receipt = Object.assign({}, this.receipt);
		return receipt;
	}

	/**
	 * @name getInvoiceObj
	 * @returns Invoice
	 */
	getInvoiceObj(): Invoice {
		this.invoice = new Invoice(
			this.invoiceInputForm.get('clientId').value,
			this.invoiceItems,
			this.invoiceInputForm.get('invoicedDate').value,
			this.invoiceInputForm.get('amountPaid').value
		);

		this.invoice.paymentMethod = this.invoiceInputForm.get('paymentMethod').value;
		this.invoice.paymentRef = this.invoiceInputForm.get('paymentRef').value;
		this.invoice.orderNote = this.invoiceInputForm.get('orderNote').value;
		this.invoice.invoiceNumber = this.invoiceInputForm.get('invoiceNumber').value;
		this.invoice.receiptId = this.receiptId;

		if (this.invoiceAmount != null) {
			this.invoice.totalAmount = +this.invoiceAmount.totalAmount;
			this.invoice.totalTax = +this.invoiceAmount.taxAmount;
			this.invoice.totalDiscount = +this.invoiceAmount.discountAmount;
		}

		this.invoice.clientName = this.setClientDetails(this.invoiceInputForm.get('clientId').value).name;
		this.invoice.id = this.invoiceId;
		const invoice = Object.assign({}, this.invoice);
		return invoice;
	}

	/**
	 * 
	 * @param invoiceItem 
	 */
	deleteItem(invoiceItem: InvoiceItem) {
		const index: number = this.invoiceItems.indexOf(invoiceItem);
		if (index !== -1) {
			this.invoiceItems.splice(index, 1);
		}
	}

	/**
	 * 
	 * @param invoiceItem 
	 */
	editItem(invoiceItem: InvoiceItem) {
		const modalRef = this.modalService.open(InvoiceItemModalComponent, { size: 'lg', keyboard: true });
		if (invoiceItem) {
			modalRef.componentInstance.invoiceItem = invoiceItem;
		}
		modalRef.componentInstance.editItemEvent.subscribe((response: InvoiceItem) => {
			this.invoiceItem = response;
			const index = this.invoiceItems.findIndex((invoiceItem) => {
				return invoiceItem.id == this.invoiceItem.id;
			});
			this.invoiceItems[index] = this.invoiceItem;
			this.calculateTotalCosts(this.invoiceItems);
		});
	}

	navigateNewClient() {
		this.router.navigateByUrl('/Invoice/New Invoice/New Client/New Client');
	}
}
