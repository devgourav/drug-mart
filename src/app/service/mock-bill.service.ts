import { Bill } from "../model/bill.model";
import { Observable,of } from 'rxjs';

const BILLS_OBJECT: Bill[] = [];
export class MockBillService {
  getBills(): Observable<Bill[]> {
    return of(BILLS_OBJECT);
  }

  deleteBill(id: string) {
    return "200";
  }
  constructor() { }
}
