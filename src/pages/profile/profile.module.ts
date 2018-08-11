import { AlertProvider } from '../../providers/alert/alert';
import { AngularFireDatabaseModule } from '../../../node_modules/angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera } from '@ionic-native/camera';
import { IonicPageModule } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { NgModule } from '@angular/core';
import { ProfilePage } from './profile';
import { UtilProvider } from '../../providers/util/util';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    AngularFireDatabaseModule,
  ],
  entryComponents: [
    ProfilePage,
  ],
  providers: [
    Camera,
    LoadingProvider,
    AlertProvider,
    AuthProvider,
    UtilProvider
  ]
})
export class ProfilePageModule { }
