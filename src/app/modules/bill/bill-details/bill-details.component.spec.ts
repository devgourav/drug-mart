import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetailsComponent } from './bill-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { BillService } from 'src/app/core/service/bill.service';
import { MockBillService } from 'src/app/core/service/mock-bill.service';





describe('BillDetailsComponent', () => {
  let component: BillDetailsComponent;
  let fixture: ComponentFixture<BillDetailsComponent>;
  let billService: BillService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,RouterTestingModule
      ],
      declarations: [ BillDetailsComponent ],
      providers: [BillService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideComponent(BillDetailsComponent,{set:{
      providers: [
        {provide: BillService, useClass:MockBillService},
        {provide: Router, useClass:Router}]
    }})
    fixture = TestBed.createComponent(BillDetailsComponent);
    component = fixture.componentInstance;
    billService = TestBed.get(BillService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
