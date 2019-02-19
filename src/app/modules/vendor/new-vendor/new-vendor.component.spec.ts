import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVendorComponent } from './new-vendor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('NewVendorComponent', () => {
  let component: NewVendorComponent;
  let fixture: ComponentFixture<NewVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,ReactiveFormsModule,RouterTestingModule,HttpClientModule ],
      declarations: [ NewVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
