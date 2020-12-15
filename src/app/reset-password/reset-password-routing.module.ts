import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordPage } from './reset-password.page';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component'

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordPage,
    pathMatch: 'full'
  },
  {
    path: ':token',
    component: SetNewPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordPageRoutingModule {}
