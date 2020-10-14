import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';

import { ListFilterPipe } from './list-filter.pipe';
import { CounterComponent } from './counter/counter.component';
import { AddCatalogueItemComponent } from './add-catalogue-item/add-catalogue-item.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

import { DeliveryAddressModalComponent } from './delivery-address-modal/delivery-address-modal.component';
import { PaymentInfoModalComponent } from './payment-info-modal/payment-info-modal.component';
import { PaymentTypeModalComponent } from './payment-type-modal/payment-type-modal.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [ CommonModule, IonicModule, FormsModule, ReactiveFormsModule ],
  declarations: [
    ListFilterPipe,
    CounterComponent,
    AddCatalogueItemComponent,
    AddCustomerComponent,
    PaymentInfoModalComponent, 
    DeliveryAddressModalComponent,
    PaymentTypeModalComponent,
    CartComponent,
    LoginComponent,
    CreateAccountComponent,
    SpinnerComponent
  ],
  entryComponents: [
    PaymentInfoModalComponent, 
    DeliveryAddressModalComponent,
    PaymentTypeModalComponent,
    CartComponent
  ],
  providers: [Camera, SocialSharing],
  exports: [
    CommonModule, 
    ListFilterPipe, 
    CounterComponent,
    AddCatalogueItemComponent,
    AddCustomerComponent,
    PaymentInfoModalComponent, 
    DeliveryAddressModalComponent,
    PaymentTypeModalComponent,
    CartComponent,
    LoginComponent,
    CreateAccountComponent,
    SpinnerComponent
  ]
})
export class SharedModule {}
