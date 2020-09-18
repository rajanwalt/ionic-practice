import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';

import { StoreTabComponent } from './store-tab/store-tab.component';
import { NewOrderTabComponent } from './new-order-tab/new-order-tab.component';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule
  ],
  declarations: [
    MainPage, 
    StoreTabComponent,
    NewOrderTabComponent,
    SettingsTabComponent]
})
export class MainPageModule {}
