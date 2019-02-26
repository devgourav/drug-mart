export class Discount{
  id: string;
  name: string;
  description: string;
  type: string;
  rate: number;
  constructor(id: string,name: string,description: string,type: string,rate: number){
    this.id  = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.rate = rate;
  }
}
