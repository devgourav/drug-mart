export class Item {
  id: string;
  name: string="";
  quantity: number = null;
  description: string="";
  HSNCode: string = "";
  batchNumber: string = "";
  packType: string="";
  manufacturer: string="";
  purchaseCost: number = null;
  itemMRP: number = null;
  saleCost: number = null;
  saleDiscount: number = null;
  saleOffers: string = null;
  expiryDate: Date = new Date();
  creationDate: Date = new Date();
  modificationDate: Date = new Date();

  constructor(name: string, quantity: number, description: string, HSNCode: string, batchNumber: string,
    expiryDate: Date,packType: string,manufacturer: string, purchaseCost: number, itemMRP: number,
    saleCost: number, saleDiscount: number,saleOffers: string) {
    this.name = name;
    this.quantity = quantity;
    this.description = description;
    this.HSNCode = HSNCode;
    this.batchNumber = batchNumber;
    this.expiryDate = expiryDate;
    this.packType = packType;
    this.manufacturer = manufacturer;
    this.purchaseCost = purchaseCost;
    this.itemMRP = itemMRP;
    this.saleCost = saleCost;
    this.saleDiscount = saleDiscount;
    this.saleOffers = saleOffers;
  }
}
