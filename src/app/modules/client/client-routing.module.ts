import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientDetailsComponent} from './client-details/client-details.component'
import { NewClientComponent } from './new-client/new-client.component';


const routes: Routes = [
	{
		path:'Clients',
		component: ClientDetailsComponent
	},
	{
		path:'Clients/New Client',
		component: NewClientComponent
	},
	{
		path:'Clients/New Client/:id',
		component: NewClientComponent
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
