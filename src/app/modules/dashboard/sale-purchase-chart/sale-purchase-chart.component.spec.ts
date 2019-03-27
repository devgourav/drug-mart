import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePurchaseChartComponent } from './sale-purchase-chart.component';

describe('SalePurchaseChartComponent', () => {
  let component: SalePurchaseChartComponent;
  let fixture: ComponentFixture<SalePurchaseChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePurchaseChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePurchaseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
