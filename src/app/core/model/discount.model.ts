export class Discount{
  id: string;
  creationDate: Date;
  modificationDate: Date;


  constructor(
    public name: string,
    public description: string,
    public type: string,
    public rate: number){
  }
}
