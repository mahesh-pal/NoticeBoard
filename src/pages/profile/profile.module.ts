import {NgModule }from '@angular/core';
import {IonicPageModule}from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

import {ProfilePage }from './profile';
import {AuthProvider}from '../../providers/auth/auth';
import {LoadingProvider} from '../../providers/loading/loading';
import {AlertProvider} from '../../providers/alert/alert';

@NgModule( {
  declarations:[
    ProfilePage,
  ],
  imports:[
    IonicPageModule.forChild(ProfilePage),
  ],
  entryComponents:[
    ProfilePage,
  ],
  providers:[
    Camera,
    LoadingProvider,
    AlertProvider,
    AuthProvider,
  ]
})
export class ProfilePageModule {}
