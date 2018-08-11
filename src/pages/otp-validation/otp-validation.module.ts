import { AlertProvider } from '../../providers/alert/alert';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicPageModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { LoadingProvider } from '../../providers/loading/loading';
import { NgModule } from '@angular/core';
import { OtpValidationPage } from './otp-validation';

@NgModule({
    declarations: [
        OtpValidationPage,
    ],
    imports: [
        IonicPageModule.forChild(OtpValidationPage),
        IonicStorageModule.forRoot(),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
    ], providers: [
        AlertProvider, LoadingProvider,
    ]
})
export class OtpValidationPageModule { }
