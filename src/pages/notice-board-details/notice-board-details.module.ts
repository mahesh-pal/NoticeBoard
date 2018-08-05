import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticeBoardDetailsPage } from './notice-board-details';
import { AuthProvider } from '../../providers/auth/auth';
import { LoadingProvider } from '../../providers/loading/loading';
import { Camera } from '../../../node_modules/@ionic-native/camera';
import { AlertProvider } from '../../providers/alert/alert';
import { UtilProvider } from '../../providers/util/util';

@NgModule({
  declarations: [
    NoticeBoardDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticeBoardDetailsPage),
  ],
  entryComponents: [NoticeBoardDetailsPage],
  providers: [AuthProvider, LoadingProvider, Camera, AlertProvider, UtilProvider],
})
export class NoticeBoardDetailsPageModule { }
