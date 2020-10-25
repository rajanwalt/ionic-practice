import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { StoreTabComponent } from './store-tab/store-tab.component';
import { NewOrderTabComponent } from './new-order-tab/new-order-tab.component';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';
import { OrdersTabComponent } from './orders-tab/orders-tab.component';
import { CustomerTabComponent } from './customer-tab/customer-tab.component'

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'new_order',
        component: NewOrderTabComponent
      },
      {
        path: 'store',
          component: StoreTabComponent
      },
      {
        path: 'settings_tab',
        component: SettingsTabComponent
      },
      {
        path: 'orders',
        component: OrdersTabComponent
      },
      {
        path: 'customers',
        component: CustomerTabComponent
      },
      {
        path: '',
        redirectTo: 'new_order',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
