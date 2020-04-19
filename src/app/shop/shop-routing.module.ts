import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopPage } from './shop.page';
import {ShopAddressComponent} from './shop-address/shop-address.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ShopPage
  },
  {
    path: 'shop-address',
    component: ShopAddressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule {}
