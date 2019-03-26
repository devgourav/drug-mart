import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleDataComponent } from './sale-data/sale-data.component';
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
	declarations: [ SaleDataComponent, DashboardDetailsComponent ],
	imports: [ CommonModule, DashboardRoutingModule ]
})
export class DashboardModule {}
