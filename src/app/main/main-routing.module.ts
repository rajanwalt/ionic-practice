import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { StoreTabComponent } from './store-tab/store-tab.component';


const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
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
        redirectTo: 'store',
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
