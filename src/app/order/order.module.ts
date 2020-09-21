import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../common';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { SelectCatalogueComponent } from './select-catalogue/select-catalogue.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CartComponent } from './cart/cart.component';
import { ShipmentOptionsComponent } from './shipment-options/shipment-options.component';
import {AddCustomRateModalComponent} from './add-custom-rate-modal/add-custom-rate-modal.component';
import {PaymentTypeModalComponent} from './payment-type-modal/payment-type-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    OrderPageRoutingModule
  ],
  declarations: [
    OrderPage,
    SelectCatalogueComponent,
    OrderSummaryComponent,
    CartComponent,
    ShipmentOptionsComponent,
    AddCustomRateModalComponent,
    PaymentTypeModalComponent
  ],
  entryComponents: [AddCustomRateModalComponent, PaymentTypeModalComponent]
})
export class OrderPageModule {}
