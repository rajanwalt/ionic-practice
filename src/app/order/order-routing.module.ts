import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderPage } from './order.page';
import { SelectCatalogueComponent } from './select-catalogue/select-catalogue.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import {AddCatalogueItemComponent} from './../common/add-catalogue-item/add-catalogue-item.component';
import { AddCustomerComponent } from './../common/add-customer/add-customer.component';
import { ShipmentOptionsComponent } from './shipment-options/shipment-options.component';
import { ViewOrderComponent } from './view-order/view-order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPage,
    pathMatch: "full"
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
    path: 'add_customer',
    component: AddCustomerComponent
  },
  {
    path: 'order_summary',
    component: OrderSummaryComponent
  },
  {
    path: 'shipment_options',
    component: ShipmentOptionsComponent
  },
  {
    path: ':id',
    component: ViewOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPageRoutingModule {}
