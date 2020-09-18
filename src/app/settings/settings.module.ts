import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import {PaymentSettingsComponent} from './payment-settings/payment-settings.component';
import { PaymentInfoModalComponent } from './payment-info-modal/payment-info-modal.component';
import { ShippingComponent } from './shipping/shipping.component';
import { VatComponent } from './vat/vat.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SettingsPageRoutingModule
  ],
  declarations: [
    SettingsPage, 
    PaymentSettingsComponent, 
    PaymentInfoModalComponent, 
    ShippingComponent,
    VatComponent
  ],
  entryComponents : [PaymentInfoModalComponent]
})
export class SettingsPageModule {}
