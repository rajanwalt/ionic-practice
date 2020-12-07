import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../common';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';

import { StoreTabComponent } from './store-tab/store-tab.component';
import { NewOrderTabComponent } from './new-order-tab/new-order-tab.component';
import { OrdersTabComponent } from './orders-tab/orders-tab.component';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';
import { CustomerTabComponent } from './customer-tab/customer-tab.component'

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './../common';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    TranslateModule.forChild({ 
      loader: {  
        provide: TranslateLoader, 
        useFactory: (createTranslateLoader),  
        deps: [HttpClient] 
      } 
    }),
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MainPageRoutingModule
  ],
  declarations: [
    MainPage, 
    StoreTabComponent,
    NewOrderTabComponent,
    SettingsTabComponent,
    OrdersTabComponent,
    CustomerTabComponent
  ]
})
export class MainPageModule {}
