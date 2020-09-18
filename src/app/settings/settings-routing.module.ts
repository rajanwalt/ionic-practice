import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import {PaymentSettingsComponent} from './payment-settings/payment-settings.component';
import { ShippingComponent } from './shipping/shipping.component';
import { VatComponent } from './vat/vat.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'payment_settings',
    component: PaymentSettingsComponent
  },
  {
    path: 'shipping',
    component: ShippingComponent
  },
  {
    path: 'vat',
    component: VatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
