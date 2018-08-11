import { AlertProvider } from '../../providers/alert/alert';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera } from '../../../node_modules/@ionic-native/camera';
import { IonicPageModule } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { NgModule } from '@angular/core';
import { NoticeBoardDetailsPage } from './notice-board-details';
import { UtilProvider } from '../../providers/util/util';
@NgModule({
  declarations: [
    NoticeBoardDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticeBoardDetailsPage),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  entryComponents: [NoticeBoardDetailsPage],
  providers: [AuthProvider, LoadingProvider, Camera, AlertProvider, UtilProvider],
})
export class NoticeBoardDetailsPageModule { }
