import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import {initialState} from './store/state';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {ShopEffects, CustomersEffects, CatalogueEffects, OrderSummaryEffects, PaymentSettingsEffects, VatEffects } from './store/effects';
import { CustomSerializer } from './store/router-custom-serializer';

import { SharedModule, RouterStateService } from './common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    // PopupContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(), 
    ReactiveFormsModule, 
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      initialState,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer}),
    EffectsModule.forRoot([ShopEffects, CustomersEffects, CatalogueEffects, OrderSummaryEffects, PaymentSettingsEffects, VatEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ImageCropperModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Crop,
    FileTransfer,
    File,
    WebView,
    RouterStateService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
