import { Injectable } from '@angular/core';
import { Bill } from '../model/billItem.model';
import { HttpClient } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class BillService {
  billList: Bill[];
  response: any;
  private billURL="http://localhost:3000/bills/";

  constructor(private http: HttpClient) {
    this.billList = [];
  }

  getBills(){
    this.http.get<Bill[]>(this.billURL)
    .subscribe((response)=>{
      this.billList = response;
    });
    console.log(this.billList);
    return this.billList;
  }

  setBill(bill: Bill){
    this.http.post<Bill>(this.billURL,bill)
    .subscribe((response)=>{
      console.log(response);
    });
  }

  deleteBill(billId: string){
    this.http.delete(this.billURL+billId)
    .subscribe((response)=>{
      console.log("DeleteBill:"+response);
    })
  }

}
