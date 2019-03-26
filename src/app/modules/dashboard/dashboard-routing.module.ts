import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewClientComponent } from '../client/new-client/new-client.component';
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';

const routes: Routes = [
	{
		path: 'Dashboard',
		component: DashboardDetailsComponent
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class DashboardRoutingModule {}
