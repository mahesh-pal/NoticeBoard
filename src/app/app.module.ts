import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AlertProvider } from '../providers/alert/alert';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AuthProvider } from '../providers/auth/auth';
import { BrowserModule } from '@angular/platform-browser';
import { CreateNoticeBoardPageModule } from '../pages/create-notice-board/create-notice-board.module';
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { LoadingProvider } from '../providers/loading/loading';
import { LoginPageModule } from '../pages/login/login.module';
import { MyApp } from './app.component';
import { NoticeBoardPageModule } from '../pages/notice-board/notice-board.module'
import { OtpValidationPageModule } from '../pages/otp-validation/otp-validation.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { config } from '../firebase-config';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(config),
        IonicModule.forRoot(MyApp,
            { scrollAssist: false, autoFocusAssist: false }),
        CreateNoticeBoardPageModule,
        LoginPageModule,
        OtpValidationPageModule,
        NoticeBoardPageModule,
        ProfilePageModule,
        SettingsPageModule,
        IonicStorageModule.forRoot(),
        AngularFireDatabaseModule,
        AngularFireAuthModule,

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
