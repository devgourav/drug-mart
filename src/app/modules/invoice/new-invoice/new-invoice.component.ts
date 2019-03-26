import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/core/model/invoice.model';
import { Amount } from 'src/app/core/model/amount.model';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { ClientService } from 'src/app/core/service/client.service';
import { InvoiceItem } from 'src/app/core/model/invoiceItem.model';
import { Client } from 'src/app/core/model/client.model';
import { OfferService } from 'src/app/core/service/offer.service';
import { Offer } from 'src/app/core/model/offer.model';
import { BillItem } from 'src/app/core/model/billItem.model';
import { InvoiceItemModalComponent } from '../invoice-item-modal/invoice-item-modal.component';

// TODO: Add A save/Update prompt

@Component({
	selector: 'app-new-invoice',
	templateUrl: './new-invoice.component.html',
	styleUrls: [ './new-invoice.component.scss' ]
})
export class NewInvoiceComponent implements OnInit {
	invoice: Invoice;
	invoiceItems: BillItem[] = [];
	invoiceItem: BillItem;

	invoiceId: string = '';
	clientId: string = '';
	paymentSystems: string[] = [ 'Cash', 'Credit', 'Cheque', 'Bank Transfer' ];

	clients: Client[];
	// clientId: string = "";
	clientName: string = '';

	invoiceInputForm = this.fb.group({
		clientId: [ '', Validators.required ],
		invoiceedDate: [ '', Validators.required ],
		orderNote: new FormControl(''),
		amountPaid: [ '', Validators.required ],
		paymentMethod: new FormControl(''),
		paymentRef: new FormControl('')
	});

	subAmount: number;
	taxAmount: number;
	discountAmount: number;
	offerAmount: number;
	totalAmount: number;
	taxRate: number;
	discountRate: number;
	offerRate: number;

	invoiceAmount: Amount = new Amount();
	constructor(
		private location: Location,
		private modalService: NgbModal,
		private _invoiceService: InvoiceService,
		private _clientService: ClientService,
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private _offerService: OfferService
	) {}

	ngOnInit() {
		this.populateClientDropDown();
		this.route.paramMap.subscribe((params) => {
			this.invoiceId = params.get('id');
			if (this.invoiceId) {
				this.getInvoice(params.get('id'));
			}
		});
	}

	get invoiceedDate() {
		return this.invoiceInputForm.get('invoiceedDate');
	}

	get amountPaid() {
		return this.invoiceInputForm.get('amountPaid');
	}

	invoiceTableHeaders = [
		'Particular',
		'Manufacturer',
		'Quantity',
		'Rate',
		'Amount',
		'Discount',
		'Tax',
		'Total',
		'Offers',
		'M.R.P',
		'Actions'
	];

	openItemModal() {
		const modalRef = this.modalService.open(InvoiceItemModalComponent, { size: 'lg', keyboard: true });
		modalRef.componentInstance.addItemEvent.subscribe((response: BillItem) => {
			this.invoiceItem = new BillItem(
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

			const invoiceItem = Object.assign({}, this.invoiceItem);
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

	getTotalAmount(rate: number, qty: number, discountRate: number, taxRate: number) {
		return ((1 + (taxRate - discountRate) * 0.01) * this.getSubAmount(rate, qty)).toFixed(2);
	}

	getOfferDiscount(offer: number) {
		return offer.toFixed(2);
	}

	calculateTotalCosts(invoiceItems: BillItem[]) {
		this.subAmount = this.taxAmount = this.discountAmount = this.offerAmount = this.totalAmount = this.taxRate = this.discountRate = this.offerRate = 0;

		for (let invoiceItem of invoiceItems) {
			this.taxRate = invoiceItem.tax['stateTax'] + invoiceItem.tax['countryTax'];
			this.discountRate = invoiceItem.discount;
			this.offerRate = invoiceItem.offer;

			const subRate = invoiceItem.rate * invoiceItem.quantity;
			this.subAmount += subRate;
			this.taxAmount += this.taxRate * 0.01 * subRate;
			this.offerAmount += this.offerRate * 0.01 * subRate;
			this.discountAmount += this.discountRate * 0.01 * subRate;
		}

		console.log('Discounts:', this.offerAmount + '->' + this.discountAmount);

		this.invoiceAmount.subAmount = this.subAmount.toFixed(2);
		this.invoiceAmount.taxAmount = this.taxAmount.toFixed(2);
		this.invoiceAmount.discountAmount = (this.discountAmount + this.offerAmount).toFixed(2);
		this.invoiceAmount.totalAmount = (+this.invoiceAmount.subAmount +
			+this.invoiceAmount.taxAmount -
			+this.invoiceAmount.discountAmount).toFixed(2);
	}

	populateClientDropDown() {
		this._clientService.getClients().subscribe((response) => {
			this.clients = response;
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
			(this.invoice.paymentRef = response.paymentRef), (this.invoiceItems = this.invoice.invoiceItems);

			this.invoiceInputForm.patchValue({
				clientId: this.invoice.clientId,
				invoiceedDate: this.invoice.invoicedDate,
				orderNote: this.invoice.orderNote,
				amountPaid: this.invoice.amountPaid,
				paymentMethod: this.invoice.paymentMethod
			});

			this.calculateTotalCosts(this.invoiceItems);
		});
	}

	fetchClientName(event: any) {
		this.clientId = event.target.value;
		this.setClientName(this.clientId);
	}

	setClientName(clientId: string): string {
		for (let client of this.clients) {
			if (clientId == client.id) {
				this.clientName = client.name;
			}
		}
		return this.clientName;
	}

	setInvoice() {
		this._invoiceService.setInvoice(this.getInvoiceObj());
		this.closeClicked();
	}

	updateInvoice() {
		this._invoiceService.updateInvoice(this.getInvoiceObj());
		this.closeClicked();
	}

	getInvoiceObj(): Invoice {
		this.invoice = new Invoice(
			this.invoiceInputForm.get('clientId').value,
			this.invoiceItems,
			this.invoiceInputForm.get('invoiceedDate').value,
			this.invoiceInputForm.get('amountPaid').value
		);

		this.invoice.paymentMethod = this.invoiceInputForm.get('paymentMethod').value;
		this.invoice.paymentRef = this.invoiceInputForm.get('paymentRef').value;
		this.invoice.orderNote = this.invoiceInputForm.get('orderNote').value;
		if (this.invoiceAmount != null) {
			this.invoice.totalAmount = +this.invoiceAmount.totalAmount;
			this.invoice.totalTax = +this.invoiceAmount.taxAmount;
			this.invoice.totalDiscount = +this.invoiceAmount.discountAmount;
		}

		this.invoice.clientName = this.setClientName(this.invoiceInputForm.get('clientId').value);
		this.invoice.id = this.invoiceId;
		const invoice = Object.assign({}, this.invoice);
		return invoice;
	}

	deleteItem(invoiceItem: BillItem) {
		const index: number = this.invoiceItems.indexOf(invoiceItem);
		if (index !== -1) {
			this.invoiceItems.splice(index, 1);
		}
	}

	editItem(invoiceItem: BillItem) {
		const modalRef = this.modalService.open(InvoiceItemModalComponent, { size: 'lg', keyboard: true });
		if (invoiceItem) {
			modalRef.componentInstance.invoiceItem = invoiceItem;
		}
		modalRef.componentInstance.editItemEvent.subscribe((response: BillItem) => {
			this.invoiceItem = response;
			for (let invoiceItem of this.invoiceItems) {
				if (this.invoiceItem.itemId == invoiceItem.itemId) {
					const index: number = this.invoiceItems.indexOf(invoiceItem);
					this.invoiceItems[index] = this.invoiceItem;
					break;
				}
			}
			this.calculateTotalCosts(this.invoiceItems);
		});
	}
}
