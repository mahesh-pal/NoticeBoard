import {AuthProvider }from '../../providers/auth/auth';
import {Component, ChangeDetectorRef, ViewChild, ElementRef }from '@angular/core';

import { IonicPage,ActionSheetController, NavController}from 'ionic-angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera';

import firebase from 'firebase';

import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage()
@Component( {
  selector:'page-profile',
  templateUrl:'profile.html',
})
export class ProfilePage {
  user:{displayName:string,phoneNumber:string,photoURL:string};
  imageURI: any;
  imageFileName: any;
  isPhoneReadOnly=true;
  isNameReadOnly=true;

  constructor(public navCtrl: NavController,
    private auth: AuthProvider,
    private camera: Camera,
    private loadingProvider: LoadingProvider,
    private alertProvider:AlertProvider,
    private actionSheetCtrl: ActionSheetController,
    private changeDetection:ChangeDetectorRef,
    private keyboard:Keyboard) {
    const user = this.auth.getActiveUser();
    this.user ={displayName:user.displayName,photoURL:user.photoURL,phoneNumber:user.phoneNumber};
}

  getUploadOptions(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Profile photo',
      buttons: [
        {
          text: 'Gallery',
          icon:'images',
          handler: () => {
            this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.getImage(this.camera.PictureSourceType.CAMERA)
          }
        }
      ]
    });
    actionSheet.present();
  }

  async getImage(sourceType:PictureSourceType){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType,
      targetHeight:210,
      targetWidth:210,
      allowEdit: true,
    }
    /**
     * TODO: get pic usinf FILE_URI.
     */
    try{
      var loader = this.loadingProvider.showLoading()
      const user = this.auth.getActiveUser();
      let picData = await this.camera.getPicture(options);

      picData = 'data:image/jpeg;base64,' + picData;
      const ref= firebase.storage().ref().child('profileImages')
        .child(user.uid);
      ref.putString(picData, firebase.storage.StringFormat.DATA_URL);

      const url = await ref.getDownloadURL();
         await user.updateProfile({
           displayName: this.user.displayName,
           photoURL: url
         });
      this.user.photoURL = user.photoURL;
      this.loadingProvider.dismiss(loader);
      this.changeDetection.detectChanges();
    }catch(error){
      this.loadingProvider.dismiss(loader);
      this.alertProvider
          .showAlert('profile pic upload failed.', 'profile pic update failed');
      }
    }

  async updateDisplayName(){
    try{
      var loader = this.loadingProvider.showLoading();
      const activeUser = this.auth.getActiveUser();
      await activeUser.updateProfile({
        displayName:this.user.displayName,
        photoURL:this.user.photoURL,
      })
      this.loadingProvider.dismiss(loader);
    }catch(error){
      this.loadingProvider.dismiss(loader);
      this.alertProvider.showAlert('update failed','update failed');
    }
  }

  editName(){
    this.isNameReadOnly=!this.isNameReadOnly;
  }
  editPhone(){
    this.isPhoneReadOnly = !this.isPhoneReadOnly;
  }
}
