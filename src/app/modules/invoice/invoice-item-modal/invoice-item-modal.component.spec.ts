import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceItemModalComponent } from './invoice-item-modal.component';

describe('InvoiceItemModalComponent', () => {
  let component: InvoiceItemModalComponent;
  let fixture: ComponentFixture<InvoiceItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
