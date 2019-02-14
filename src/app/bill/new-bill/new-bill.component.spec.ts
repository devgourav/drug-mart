import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewBillComponent } from './new-bill.component';
import { VendorService } from 'src/app/service/vendor.service';
import { BillService } from 'src/app/service/bill.service';
import { MockBillService } from 'src/app/service/mock-bill.service';
import { MockVendorService } from 'src/app/service/mock-vendor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('NewBillComponent', () => {
  let component: NewBillComponent;
  let fixture: ComponentFixture<NewBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,RouterTestingModule,FormsModule,ReactiveFormsModule
      ],
      declarations: [ NewBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideComponent(NewBillComponent,{set:{
      providers: [
        {provide: Location, useClass:Location},
        {provide: NgbModal, useClass:NgbModal},
        {provide: BillService, useClass:MockBillService},
        {provide: VendorService, useClass:MockVendorService}
      ]
    }})
    fixture = TestBed.createComponent(NewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
