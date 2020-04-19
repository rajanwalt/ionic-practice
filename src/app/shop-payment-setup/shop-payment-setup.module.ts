import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopPaymentSetupPageRoutingModule } from './shop-payment-setup-routing.module';

import { ShopPaymentSetupPage } from './shop-payment-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopPaymentSetupPageRoutingModule
  ],
  declarations: [ShopPaymentSetupPage]
})
export class ShopPaymentSetupPageModule {}
