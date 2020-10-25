import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { IonicModule } from '@ionic/angular';
import { ImageCropperModule } from 'ngx-image-cropper';

import { SharedModule } from './../common';
import { ShopPageRoutingModule } from './shop-routing.module';

import {Geolocation} from '@ionic-native/geolocation/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { ShopPage } from './shop.page';
import {ShopAddressComponent} from './shop-address/shop-address.component';
import { MapComponent } from './map/map.component';
import {CatalogueComponent} from './catalogue/catalogue.component';
import {ViewCatalogueComponent } from './view-catalogue/view-catalogue.component';
import {WalletComponent} from './wallet/wallet.component';
import { AddWalletComponent } from './add-wallet/add-wallet.component';
import { CustomersComponent } from './customers/customers.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { AddPayoutMethodComponent } from './add-payout-method/add-payout-method.component';
import {PopupContentComponent} from './popup-content/popup-content.component';

import { MonekatService, PhotoService } from './../APIs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    SharedModule,
    ImageCropperModule,
    ShopPageRoutingModule,
  ],
  declarations: [
    ShopPage, 
    ShopAddressComponent, 
    MapComponent, 
    CatalogueComponent,
    ViewCatalogueComponent,
    WalletComponent,
    AddWalletComponent,
    CustomersComponent,
    PopupContentComponent,
    ViewCustomerComponent,
    AddPayoutMethodComponent
    // ListFilterPipe
  ],
  entryComponents : [PopupContentComponent, ShopAddressComponent],
  providers: [
    Geolocation,
    Camera,
    MonekatService,
    PhotoService
  ]
})
export class ShopPageModule {}
