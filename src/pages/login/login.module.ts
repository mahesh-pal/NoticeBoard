import {AlertProvider }from '../../providers/alert/alert';
import {NgModule }from '@angular/core';
import {IonicPageModule }from 'ionic-angular';

import {LoginPage }from './login';
import {LoadingProvider }from '../../providers/loading/loading';

@NgModule( {
  declarations:[LoginPage],
  imports:[IonicPageModule.forChild(LoginPage)],
  entryComponents:[LoginPage],
  providers:[LoadingProvider, AlertProvider ]
})
export class LoginPageModule {}
