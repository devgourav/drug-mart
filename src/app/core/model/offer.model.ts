export class Offer{
  id: string;
  description: string
  creationDate: Date;
  modificationDate: Date;

  constructor(
    public name: string,
    public minItems: number,
    public freeItems: number
    ){
  }


}
