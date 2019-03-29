import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NewUserComponent } from './new-user/new-user.component';
import { SharedModule } from 'src/app/core/shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
	declarations: [ UserDetailsComponent, NewUserComponent ],
	imports: [
		CommonModule,
		UserRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		TableModule,
		SharedModule,
		ConfirmDialogModule,
		BrowserAnimationsModule,
		ToastModule,
		CheckboxModule
	]
})
export class UserModule {}
