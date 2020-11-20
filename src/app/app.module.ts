import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera/ngx';


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
import {ShopEffects, 
  CustomersEffects, 
  CatalogueEffects, 
  OrderSummaryEffects, 
  PaymentSettingsEffects, 
  VatEffects, 
  LoginEffects,
  ShippingChargesEffects,
  FileEffects,
  SettingsEffects } from './store/effects';
import { CustomSerializer } from './store/router-custom-serializer';
import { SharedModule, RouterStateService, ErrorHandlerService, createTranslateLoader } from './common';
import { PendingRequestsInterceptor } from './APIs';


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
    EffectsModule.forRoot([ShopEffects, 
      CustomersEffects, 
      CatalogueEffects, 
      OrderSummaryEffects, 
      PaymentSettingsEffects, 
      VatEffects, 
      LoginEffects,
      ShippingChargesEffects,
      FileEffects,
      SettingsEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TranslateModule.forRoot({ 
      loader: {  
        provide: TranslateLoader, 
        useFactory: (createTranslateLoader),  
        deps: [HttpClient] 
      } 
    }), 
    ImageCropperModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: PendingRequestsInterceptor, multi: true},
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    Crop,
    FileTransfer,
    File,
    FilePath,
    WebView,
    Camera,
    RouterStateService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
