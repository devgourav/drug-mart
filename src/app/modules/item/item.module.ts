import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemRoutingModule } from './item-routing.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { TableModule } from 'primeng/table';

@NgModule({
	declarations: [ NewItemComponent, ItemDetailsComponent ],
	imports: [ CommonModule, ItemRoutingModule, FormsModule, ReactiveFormsModule, TableModule, SharedModule ],
	exports: []
})
export class ItemModule {}
