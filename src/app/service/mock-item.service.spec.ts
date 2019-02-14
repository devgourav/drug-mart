import { TestBed } from '@angular/core/testing';

import { MockItemService } from './mock-item.service';

describe('MockItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockItemService = TestBed.get(MockItemService);
    expect(service).toBeTruthy();
  });
});
