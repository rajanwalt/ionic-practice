import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutPage } from './checkout.page';
import { ReviewComponent } from './review/review.component';
import { PaymentComponent } from './payment/payment.component';
import { DeliveryComponent } from './delivery/delivery.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutPage,
    children : [
      {
        path: 'review',
        component : ReviewComponent
      },
      {
        path: 'payment',
        component : PaymentComponent
      },
      {
        path: 'delivery',
        component : DeliveryComponent
      },
      {
        path: '',
        redirectTo: 'delivery',
        pathMatch: 'full'
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutPageRoutingModule {}
