import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleDataComponent } from './sale-data/sale-data.component';
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PurchaseDataComponent } from './purchase-data/purchase-data.component';
import { SalePurchaseChartComponent } from './sale-purchase-chart/sale-purchase-chart.component';
import { ChartModule } from 'primeng/chart';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [ SaleDataComponent, DashboardDetailsComponent, PurchaseDataComponent, SalePurchaseChartComponent ],
	imports: [ CommonModule, DashboardRoutingModule, ChartModule, BrowserAnimationsModule ]
})
export class DashboardModule {}
