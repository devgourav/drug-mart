import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillDetailsComponent} from './bill-details/bill-details.component'
import { NewBillComponent } from './new-bill/new-bill.component';

const routes: Routes = [
	{
		path:'Bills',
		component: BillDetailsComponent
	},
	{
		path:'Bills/New Bill',
		component: NewBillComponent
	},


];


//TODO: Run my function
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
