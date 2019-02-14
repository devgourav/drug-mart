import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetailsComponent } from './bill-details.component';
import { BillService } from 'src/app/service/bill.service';
import { MockBillService } from 'src/app/service/mock-bill.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';





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
