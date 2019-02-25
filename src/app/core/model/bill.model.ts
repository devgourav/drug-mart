import { BillItem } from './billItem.model';

export class Bill {
  id: string;
  vendorId: string;
  vendorName: string;
  billItems: BillItem[]
  billedDate: Date;
  totalTax: number;
  totalDiscount: number;
  totalAmount: number;
  orderNote: string;
  paymentMethod: string;
  amountPaid: number;

  constructor(vendorId: string, billItems: BillItem[],billedDate: Date,orderNote: string,
    paymentMethod: string, amountPaid: number) {
    this.vendorId = vendorId;
    this.billItems = billItems;
    this.billedDate = billedDate;
    this.orderNote = orderNote;
    this.paymentMethod = paymentMethod;
    this.amountPaid = amountPaid;
  }

}
