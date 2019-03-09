import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorRoutingModule } from './vendor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { NewVendorComponent } from './new-vendor/new-vendor.component';
import { SharedModule } from 'src/app/core/shared/shared.module';

@NgModule({
  declarations: [VendorDetailsComponent, NewVendorComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class VendorModule { }
