import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import {PaymentSettingsComponent} from './payment-settings/payment-settings.component';
import { ShippingComponent } from './shipping/shipping.component';
import { VatComponent } from './vat/vat.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';

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
    ShippingComponent,
    VatComponent,
    UserProfileComponent,
    ChangePasswordModalComponent
  ],
  entryComponents: [ChangePasswordModalComponent]
})
export class SettingsPageModule {}
