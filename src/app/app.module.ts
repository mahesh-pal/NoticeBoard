import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CreateNoticeBoardPageModule} from '../pages/create-notice-board/create-notice-board.module';
import { LoginPageModule } from '../pages/login/login.module';
import { OtpValidationPageModule } from '../pages/otp-validation/otp-validation.module';
import { NoticeBoardPageModule } from '../pages/notice-board/notice-board.module'
import firebase from 'firebase';
import {config} from './firebase-config';

firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CreateNoticeBoardPageModule,
    LoginPageModule,
    OtpValidationPageModule,
    NoticeBoardPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
