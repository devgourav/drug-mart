import { BillItem } from './billItem.model';

export class Bill {
  id: string;
  vendorName: string;
  totalTax: number;
  totalDiscount: number;
  totalAmount: number;
  creationDate: Date;
  modificationDate: Date;

  constructor(
    public vendorId: string,
    public billItems: BillItem[],
    public billedDate: Date,
    public orderNote: string,
    public paymentMethod: string,
    public amountPaid: number) {
  }

}
