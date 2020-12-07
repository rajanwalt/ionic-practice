import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
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
    ReactiveFormsModule,
    LoginPageRoutingModule
  ],
  declarations: [
    LoginPage,
  ]
})
export class LoginPageModule {}
