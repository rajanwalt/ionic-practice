import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { IonicModule } from '@ionic/angular';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ShopPageRoutingModule } from './shop-routing.module';

import {Geolocation} from '@ionic-native/geolocation/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { ShopPage } from './shop.page';
import {ShopAddressComponent} from './shop-address/shop-address.component';
import { MapComponent } from './map/map.component';
import { ImageUploaderComponent } from './../common/image-uploader/image-uploader.component';
import {CatalogueComponent} from './catalogue/catalogue.component';
import {AddCatalogueItemComponent} from './add-catalogue-item/add-catalogue-item.component';

import { MonekatService, PhotoService } from './../APIs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    ImageCropperModule,
    ShopPageRoutingModule,
  ],
  declarations: [
    ShopPage, 
    ShopAddressComponent, 
    MapComponent, 
    ImageUploaderComponent,
    CatalogueComponent,
    AddCatalogueItemComponent
  ],
  providers: [
    Geolocation,
    ImagePicker,
    Camera,
    MonekatService,
    PhotoService
  ]
})
export class ShopPageModule {}
