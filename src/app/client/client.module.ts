import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { NewClientComponent } from './new-client/new-client.component';

import { ClientRoutingModule } from './client-routing.module'


@NgModule({
  declarations: [ClientDetailsComponent, NewClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
