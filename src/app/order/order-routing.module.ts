import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderPage } from './order.page';
import { SelectCatalogueComponent } from './select-catalogue/select-catalogue.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import {AddCatalogueItemComponent} from './../common/add-catalogue-item/add-catalogue-item.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPage,
  },
  {
    path: 'add_item',
    component: SelectCatalogueComponent
  },
  {
    path: 'add_new_item',
    component: AddCatalogueItemComponent
  },

  {
    path: 'order_summary',
    component: OrderSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPageRoutingModule {}
