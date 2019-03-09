export class Discount{
  id: string;
  description: string
  creationDate: Date;
  modificationDate: Date;


  constructor(
    public name: string,
    public rate: number,
    public type: string
    ){
  }
}
