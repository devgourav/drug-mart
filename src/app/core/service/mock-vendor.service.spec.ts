import { TestBed } from '@angular/core/testing';

import { MockVendorService } from './mock-vendor.service';

describe('MockVendorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockVendorService = TestBed.get(MockVendorService);
    expect(service).toBeTruthy();
  });
});
