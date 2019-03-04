import { InvoiceItem } from './invoiceItem.model';

export class Invoice {
  id: string;
  clientName: string;
  totalTax: number;
  totalDiscount: number;
  totalAmount: number;
  creationDate: Date;
  modificationDate: Date;

  constructor(
    public clientId: string,
    public invoicedDate: Date,
    public invoiceItems: InvoiceItem[],
    public orderNote: string,
    public paymentMethod: string,
    public amountPaid: number) {
  }
}
