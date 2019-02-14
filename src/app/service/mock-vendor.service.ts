import { Vendor } from '../model/vendor.model';
import { of, Observable } from 'rxjs';

const VENDORS_OBJECT: Vendor[] = [];
export class MockVendorService {
  getVendors(): Observable<Vendor[]> {
    return of(VENDORS_OBJECT);
  }

  deleteVendor(id: string) {
    return "200";
  }

  constructor() { }
}
