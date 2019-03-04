export class Item {
  id: string;
  creationDate: Date;
  modificationDate: Date;

  constructor(
    public name: string,
    public quantity: number,
    public description: string,
    public HSNCode: string,
    public batchNumber: string,
    public expiryDate: Date,
    public packType: string,
    public manufacturer: string,
    public purchaseCost: number,
    public itemMRP: number,
    public saleCost: number,
    public saleDiscount: number,
    public saleOffers: string) {
  }
}
