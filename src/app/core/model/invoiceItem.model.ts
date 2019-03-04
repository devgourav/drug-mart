export class InvoiceItem {
  id: string;
  creationDate: Date;
  modificationDate: Date;

  constructor(
    public itemId: string,
    public itemName: string,
    public packType: string,
    public itemHSN: string,
    public manufacturer: string,
    public batchNumber: string,
    public expiryDate: Date,
    public quantity: number,
    public rate: number,
    public itemMRP: number,
    public tax: Map<string, number>,
    public discount: number,
    public offer: string){
      
    }

}
