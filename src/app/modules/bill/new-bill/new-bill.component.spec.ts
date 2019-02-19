import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewBillComponent } from './new-bill.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillService } from 'src/app/core/service/bill.service';
import { MockBillService } from 'src/app/core/service/mock-bill.service';
import { MockVendorService } from 'src/app/core/service/mock-vendor.service';
import { VendorService } from 'src/app/core/service/vendor.service';


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
