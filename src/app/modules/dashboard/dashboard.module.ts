import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashDetailsComponent } from './dash-details/dash-details.component';
import { SidebarComponent } from 'src/app/core/common/sidebar/sidebar.component';

@NgModule({
  declarations: [DashDetailsComponent,SidebarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
