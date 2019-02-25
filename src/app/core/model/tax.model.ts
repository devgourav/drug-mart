export class Tax{
  id: string;
  name: string;
  rate: number;

  constructor(id: string,name: string,rate: number){
    this.id  = id;
    this.name = name;
    this.rate = rate;
  }
}
