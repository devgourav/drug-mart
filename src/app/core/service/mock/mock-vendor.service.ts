import { of, Observable } from 'rxjs';
import { Vendor } from '../../model/vendor.model';

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
