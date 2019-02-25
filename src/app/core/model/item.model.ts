export class Item {
  id: string;
  name: string;
  quantity: number;
  description: string;
  HSNCode: string;
  packType: string;
  manufacturer: string;
  purchaseCost: number;
  itemMRP: number;
  saleCost: number;
  saleDiscount: number;
  saleOffers: string;

  constructor(name: string, quantity: number, description: string, HSNCode: string, packType: string,
    manufacturer: string, purchaseCost: number, itemMRP: number, saleCost: number, saleDiscount: number,
    saleOffers: string) {
    this.name = name;
    this.quantity = quantity;
    this.description = description;
    this.HSNCode = HSNCode;
    this.packType = packType;
    this.manufacturer = manufacturer;
    this.purchaseCost = purchaseCost;
    this.itemMRP = itemMRP;
    this.saleCost = saleCost;
    this.saleDiscount = saleDiscount;
    this.saleOffers = saleOffers;
  }
}
