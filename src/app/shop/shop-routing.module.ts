import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopPage } from './shop.page';
import {ShopAddressComponent} from './shop-address/shop-address.component';
import {CatalogueComponent} from './catalogue/catalogue.component';
import {AddCatalogueItemComponent} from './add-catalogue-item/add-catalogue-item.component';
import {ViewCatalogueComponent } from './view-catalogue/view-catalogue.component';
import {WalletComponent} from './wallet/wallet.component';
import { AddWalletComponent } from './add-wallet/add-wallet.component';
import { CustomersComponent } from './customers/customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';


const routes: Routes = [
  {
    path: "add_shop",
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
    path: 'view_catalogue_item',
    component: ViewCatalogueComponent
  },
  {
    path: 'my_wallet',
    component: WalletComponent
  },
  {
    path: 'add_wallet',
    component: AddWalletComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'add_customer',
    component: AddCustomerComponent
  },
  {
    path: 'view_customer',
    component: ViewCustomerComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'add_shop'
    // component: ShopPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule {}
