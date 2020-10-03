import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { CheckoutPage } from './checkout.page';
import { ReviewComponent } from './review/review.component';
import { PaymentComponent } from './payment/payment.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { SharedModule } from './../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule,
    SharedModule
  ],
  declarations: [
    CheckoutPage, 
    ReviewComponent,
    PaymentComponent, 
    DeliveryComponent  ]
})
export class CheckoutPageModule {}
