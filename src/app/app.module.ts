import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { CreateNoticeBoardPageModule } from '../pages/create-notice-board/create-notice-board.module';
import { LoginPageModule } from '../pages/login/login.module';
import { OtpValidationPageModule } from '../pages/otp-validation/otp-validation.module';
import { NoticeBoardPageModule } from '../pages/notice-board/notice-board.module'
import firebase from 'firebase';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { config } from './firebase-config';
import { LoadingProvider } from '../providers/loading/loading';
import { AlertProvider } from '../providers/alert/alert';
import { AuthProvider } from '../providers/auth/auth';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { IonicStorageModule } from '@ionic/storage';

firebase.initializeApp(config);

@NgModule({
    declarations: [
        MyApp,
        HomePage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp,
            { scrollAssist: false, autoFocusAssist: false }),
        CreateNoticeBoardPageModule,
        LoginPageModule,
        OtpValidationPageModule,
        NoticeBoardPageModule,
        ProfilePageModule,
        SettingsPageModule,
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
    ],
    providers: [
        StatusBar, Keyboard,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        LoadingProvider,
        AlertProvider,
        AuthProvider,
    ]
})
export class AppModule { }
