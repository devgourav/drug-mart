import { InvoiceItem } from './invoiceItem.model';

export class Invoice {
  id: string;
  clientId: string;
  clientName: string;
  invoicedDate: Date;
  invoiceItems: InvoiceItem[];
  totalTax: number;
  totalDiscount: number;
  totalAmount: number;
  orderNote: string;
  paymentMethod: string;
  amountPaid: number;

  constructor(clientId: string, invoicedDate: Date, invoiceItems: InvoiceItem[],
    orderNote: string,paymentMethod: string, amountPaid: number) {
    this.clientId = clientId;
    this.invoicedDate = invoicedDate;
    this.invoiceItems = invoiceItems;
    this.orderNote = orderNote;
    this.paymentMethod = paymentMethod;
    this.amountPaid = amountPaid;
  }
}
