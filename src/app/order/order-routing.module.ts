import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderPage } from './order.page';
import { SelectCatalogueComponent } from './select-catalogue/select-catalogue.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPage
  },
  {
    path: 'add_item',
    component: SelectCatalogueComponent
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
