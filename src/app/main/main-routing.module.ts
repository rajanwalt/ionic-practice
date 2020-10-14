import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { StoreTabComponent } from './store-tab/store-tab.component';
import { NewOrderTabComponent } from './new-order-tab/new-order-tab.component';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';
import { OrdersTabComponent } from './orders-tab/orders-tab.component';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'new_order',
        children: [
          {
            path: '',
            component: NewOrderTabComponent
          }
        ]
      },
      {
        path: 'store',
        children: [
          {
            path: '',
            component: StoreTabComponent
          }
        ]
      },
      {
        path: 'settings_tab',
        children: [
          {
            path: '',
            component: SettingsTabComponent
          }
        ]
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            component: OrdersTabComponent
          }
        ]
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
