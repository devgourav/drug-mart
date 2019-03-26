import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDataComponent } from './sale-data.component';

describe('SaleDataComponent', () => {
  let component: SaleDataComponent;
  let fixture: ComponentFixture<SaleDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
