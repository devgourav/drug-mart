import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { AuthModule } from './core/auth/auth.module';
import { SidebarComponent } from './core/common/sidebar/sidebar.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AuthService } from './core/service/auth.service';
import { ClientService } from './core/service/client.service';
import { SharedModule } from './core/shared/shared.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { UserModule } from './modules/user/user.module';
import { UserService } from './core/service/user.service';

@NgModule({
	declarations: [ AppComponent, SidebarComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		VendorModule,
		BillModule,
		ClientModule,
		InvoiceModule,
		ItemModule,
		SettingsModule,
		DashboardModule,
		UserModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AuthModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule.enablePersistence(),
		AngularFireAuthModule,
		SharedModule
	],
	providers: [ VendorService, BillService, ItemService, InvoiceService, AuthService, ClientService, UserService ],
	bootstrap: [ AppComponent ],
	exports: [ SidebarComponent ]
})
export class AppModule {}
