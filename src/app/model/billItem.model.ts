export class BillItem {
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
  tax1: number;
  tax2: number;
  discount: number;
  offer: string;
}

export class Bill {
  id: string;
  vendorName: string;
  vendorId: string;
  billedDate: Date;
  billItems: BillItem[];
  totalTax: number;
  totalDiscount: number;
  totalAmount: number;
  orderNote: string;
  paymentMethod: string;
  amountPaid: number;
}
