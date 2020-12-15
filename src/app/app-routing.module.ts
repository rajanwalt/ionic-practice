import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './common/login/login.component';
import { TransactionStatusComponent } from './common/transaction-status/transaction-status.component';
import { CreateAccountComponent } from './common/create-account/create-account.component';
import { KycComponent } from './common/kyc/kyc.component';
import { RepDetailsComponent } from './common/rep-details/rep-details.component';

import { AuthGuardService } from './APIs';

const routes: Routes = [
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'shop-payment-setup',
    loadChildren: () => import('./shop-payment-setup/shop-payment-setup.module').then( m => m.ShopPaymentSetupPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule),
    canActivate: [AuthGuardService]
  },
  
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  },
  {
    path: 'kyc',
    component: KycComponent
  },
  {
    path: 'representative-details',
    component: RepDetailsComponent
  },
  {
    path: 'transaction-status',
    component: TransactionStatusComponent
  },
  {
    path: 'welcome',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    // path: 'checkout',
    path: ':shopName',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  // { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
