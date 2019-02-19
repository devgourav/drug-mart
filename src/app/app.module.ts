 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { SidebarComponent } from './sidebar/sidebar.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorModule } from './modules/vendor/vendor.module';
import { BillModule } from './modules/bill/bill.module';
import { ClientModule } from './modules/client/client.module';
import { VendorService } from './core/service/vendor.service';
import { BillService } from './core/service/bill.service';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ItemModule } from './modules/item/item.module';
import { ItemService } from './core/service/item.service';
import { InvoiceService } from './core/service/invoice.service';




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
  providers: [ VendorService, BillService, ItemService,InvoiceService ],
  bootstrap: [AppComponent],
  exports:[SidebarComponent]

})
export class AppModule { }
