import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvoiceComponent } from './new-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('NewInvoiceComponent', () => {
  let component: NewInvoiceComponent;
  let fixture: ComponentFixture<NewInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,ReactiveFormsModule ],
      declarations: [ NewInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
