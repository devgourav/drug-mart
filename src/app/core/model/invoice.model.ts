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
  tax: Map<string,number> = new Map();
  discount: number;
  offer: string;

  constructor(itemId: string, itemName: string,packType: string,itemHSN: string,manufacturer: string,
     batchNumber: string,expiryDate: Date,quantity: number,rate: number,
     itemMRP: number,tax: Map<string, number>,discount: number,offer: string) {
    this.itemId = itemId;
    this.itemName = itemName;
    this.packType = packType;
    this.itemHSN = itemHSN;
    this.manufacturer = manufacturer;
    this.batchNumber = batchNumber;
    this.expiryDate = expiryDate;
    this.quantity = quantity;
    this.rate = rate;
    this.itemMRP = itemMRP;
    this.tax = tax;
    this.discount = discount;
    this.offer = offer;
  }

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

  constructor(clientId: string, clientName: string, invoicedDate: Date, invoiceItems: InvoiceItem[],
    totalTax: number, totalDiscount: number, totalAmount: number, orderNote: string,
    paymentMethod: string, amountPaid: number) {
    this.clientId = clientId;
    this.clientName = clientName;
    this.invoicedDate = invoicedDate;
    this.invoiceItems = invoiceItems;
    this.totalTax = totalTax;
    this.totalDiscount = totalDiscount;
    this.totalAmount = totalAmount;
    this.orderNote = orderNote;
    this.paymentMethod = paymentMethod;
    this.amountPaid = amountPaid;
  }
}
