 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { SidebarComponent } from './sidebar/sidebar.component';
import { VendorModule } from './vendor/vendor.module';
import { BillModule } from './bill/bill.module';
import { ClientModule } from './client/client.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ItemModule } from './item/item.module';
import { SettingsModule } from './settings/settings.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorService } from './service/vendor.service'
import { BillService } from './service/bill.service'



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VendorModule,
    BillModule,
    ClientModule,
    InvoiceModule,
    ItemModule,
    SettingsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ VendorService, BillService ],
  bootstrap: [AppComponent],
  exports:[SidebarComponent]

})
export class AppModule { }
