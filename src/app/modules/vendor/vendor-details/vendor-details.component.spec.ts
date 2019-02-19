import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDetailsComponent } from './vendor-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('VendorDetailsComponent', () => {
  let component: VendorDetailsComponent;
  let fixture: ComponentFixture<VendorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,ReactiveFormsModule,RouterTestingModule,HttpClientModule ],
      declarations: [ VendorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
