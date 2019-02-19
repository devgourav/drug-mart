import { TestBed } from '@angular/core/testing';

import { CompanyDetailsService } from './company-details.service';

describe('CompanyDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyDetailsService = TestBed.get(CompanyDetailsService);
    expect(service).toBeTruthy();
  });
});
