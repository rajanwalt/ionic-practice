import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { StoreTabComponent } from './store-tab/store-tab.component';
import { NewOrderTabComponent } from './new-order-tab/new-order-tab.component';

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
