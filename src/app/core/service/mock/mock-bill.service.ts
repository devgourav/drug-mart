
import { Observable,of } from 'rxjs';
import { Bill } from '../../model/bill.model';

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
