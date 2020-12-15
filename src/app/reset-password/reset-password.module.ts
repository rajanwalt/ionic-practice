import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './../common';
import { HttpClient } from '@angular/common/http';

import { SetNewPasswordComponent } from './set-new-password/set-new-password.component'


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
    ReactiveFormsModule,
    ResetPasswordPageRoutingModule
  ],
  declarations: [ResetPasswordPage, SetNewPasswordComponent]
})
export class ResetPasswordPageModule {}
