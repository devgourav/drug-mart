import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardDetailsComponent } from './modules/dashboard/dashboard-details/dashboard-details.component';

const routes: Routes = [
	{
		path: 'Dashboard',
		component: DashboardDetailsComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
