export class InvoiceItem {
  id: string;
  itemId:string;
  itemName: string;
  packType: string;
  itemHSN: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: Date;
  quantity: number;
  rate: number;
  itemMRP: number;
  stateTax: number;
  countryTax: number;
  discount: number;
  offer: string;
}

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
}
