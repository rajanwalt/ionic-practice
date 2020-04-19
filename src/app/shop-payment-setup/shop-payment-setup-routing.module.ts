import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopPaymentSetupPage } from './shop-payment-setup.page';

const routes: Routes = [
  {
    path: '',
    component: ShopPaymentSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPaymentSetupPageRoutingModule {}
