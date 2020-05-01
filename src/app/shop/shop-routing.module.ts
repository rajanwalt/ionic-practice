import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopPage } from './shop.page';
import {ShopAddressComponent} from './shop-address/shop-address.component';
import {CatalogueComponent} from './catalogue/catalogue.component';
import {AddCatalogueItemComponent} from './add-catalogue-item/add-catalogue-item.component';


const routes: Routes = [
  {
    path: "add-shop",
    component: ShopPage
  },
  {
    path: 'shop-address',
    component: ShopAddressComponent
  },
  {
    path: 'catalogue',
    component: CatalogueComponent
  },
  {
    path: 'add_catalogue_item',
    component: AddCatalogueItemComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'add_catalogue_item'
    // component: ShopPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule {}
