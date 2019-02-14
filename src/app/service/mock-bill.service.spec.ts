import { TestBed } from '@angular/core/testing';

import { MockBillService } from './mock-bill.service';

describe('MockBillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockBillService = TestBed.get(MockBillService);
    expect(service).toBeTruthy();
  });
});
