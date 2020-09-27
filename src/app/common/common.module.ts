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

@NgModule({
  imports: [ CommonModule, IonicModule, FormsModule, ReactiveFormsModule ],
  declarations: [
    ListFilterPipe,
    CounterComponent,
    AddCatalogueItemComponent,
    AddCustomerComponent,
    DeliveryAddressModalComponent
  ],
  entryComponents: [
    DeliveryAddressModalComponent
  ],
  providers: [Camera, SocialSharing],
  exports: [
    CommonModule, 
    ListFilterPipe, 
    CounterComponent,
    AddCatalogueItemComponent,
    AddCustomerComponent,
    DeliveryAddressModalComponent
  ]
})
export class SharedModule {}
