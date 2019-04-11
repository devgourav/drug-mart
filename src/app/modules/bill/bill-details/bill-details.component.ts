import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bill } from 'src/app/core/model/bill.model';
import { BillService } from 'src/app/core/service/bill.service';
import { BillItem } from 'src/app/core/model/billItem.model';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { PaymentService } from 'src/app/core/service/payment.service';
import { VendorService } from 'src/app/core/service/vendor.service';
import { Payment } from 'src/app/core/model/payment.model';
import { Vendor } from 'src/app/core/model/vendor.model';

@Component({
	selector: 'app-bill-details',
	templateUrl: './bill-details.component.html',
	styleUrls: [ './bill-details.component.scss' ],
	providers: [ ConfirmationService, MessageService ]
})
export class BillDetailsComponent implements OnInit {
	bills: Bill[] = [];
	tableHeaders: any[] = [];
	msgs: Message[] = [];
	payment: Payment;
	vendor: Vendor;
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

	ngOnInit() {
		this.getBills();

		this.tableHeaders = [
			{ field: 'billNumber', header: 'Bill No.' },
			{ field: 'billedDate', header: 'Billed Date' },
			{ field: 'vendorName', header: 'Vendor' },
			{ field: '', header: 'Sub Amount' },
			{ field: 'totalAmount', header: 'Total Amount' },
			{ field: '', header: 'Amount Paid' }
		];
	}

	/**
	 * @name getBills
	 */
	getBills() {
		this._billService.getBills().subscribe((response) => {
			this.bills = response;
		});
	}

	/**
	 * 
	 * @param bill 
	 * @name deleteBill
	 */
	deleteBill(bill: Bill) {
		this._paymentService.getPaymentById(bill.paymentId).subscribe((paymentResponse) => {
			this.payment = paymentResponse;
			this._vendorService.getVendorById(this.payment.vendorId).subscribe((vendorResponse) => {
				vendorResponse.amountBalance += this.payment.amountPaid - bill.totalAmount;
				this.vendor = vendorResponse;

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
			});
		});
	}

	/**
	 * 
	 * @param billId 
	 */
	editBill(billId: string) {
		this.router.navigate([ 'Bills/New Bill', billId ]);
	}

	getSubAmount(bill: Bill) {
		return (bill.totalAmount + bill.totalDiscount - bill.totalTax).toFixed(2);
	}

	/**
	 * 
	 * @param billId 
	 */
	printBill(billId: string) {
		this.router.navigate([ 'Bills/Print Bill', billId ]);
	}
}
