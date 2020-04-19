import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ShopPageRoutingModule } from './shop-routing.module';

import { ShopPage } from './shop.page';
import {ShopAddressComponent} from './shop-address/shop-address.component';
import { MapComponent } from './map/map.component';

import {Geolocation} from '@ionic-native/geolocation/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { MonekatService } from './../APIs/monekat.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    ShopPageRoutingModule,
  ],
  declarations: [ShopPage, ShopAddressComponent, MapComponent],
  providers: [
    Geolocation,
    ImagePicker,
    Camera,
    MonekatService
  ]
})
export class ShopPageModule {}
