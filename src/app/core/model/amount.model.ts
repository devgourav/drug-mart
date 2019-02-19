export class Amount{
  taxAmount: number;
  discountAmount: number;
  subAmount: number;//Amount
  totalAmount:number;//Amount - Discount + Tax

  constructor(){
    this.taxAmount=0;
    this.discountAmount=0;
    this.subAmount=0;
    this.totalAmount=0;
  }

}
