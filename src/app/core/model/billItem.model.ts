export class BillItem {
  id:string;
  billId: string;
  itemId: string;
  itemName: string;
  packType: string;
  itemHSN: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: Date;
  quantity: number;
  rate: number;
  itemMRP: number;
  tax: Map<string,number>;
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
