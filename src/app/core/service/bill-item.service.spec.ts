import { TestBed } from '@angular/core/testing';

import { BillItemService } from './bill-item.service';

describe('BillItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillItemService = TestBed.get(BillItemService);
    expect(service).toBeTruthy();
  });
});
