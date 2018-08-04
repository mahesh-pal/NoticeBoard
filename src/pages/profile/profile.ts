import { AuthProvider } from '../../providers/auth/auth';
import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';

import { IonicPage, ActionSheetController, NavController, TextInput } from 'ionic-angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera';
import firebase from 'firebase';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UtilProvider } from '../../providers/util/util';
import { User } from '../../models/user';

const options: CameraOptions = {
  quality: 100,
  destinationType: 0,
  mediaType: 0,
  targetHeight: 210,
  targetWidth: 210,
  allowEdit: true,
}
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User = {} as User;
  imageURI: any;
  imageFileName: any;
  isNameReadOnly = true;
  isCreateUser = false;
  @ViewChild('nameInput') nameInput: TextInput;

  constructor(public navCtrl: NavController,
    private util: UtilProvider,
    private auth: AuthProvider,
    private camera: Camera,
    private loadingProvider: LoadingProvider,
    private alertProvider: AlertProvider,
    private changeDetection: ChangeDetectorRef,
    private navParam: NavParams) {
    this.isCreateUser = !!this.navParam.data.createUser;
    this.isNameReadOnly = !this.isCreateUser;
    const user = this.auth.getActiveUser();
    firebase.database().ref().child('users').child(user.uid)
      .on('value', snap => {
        if (snap.val())
          this.user = snap.val() as User;
      });
  }

  getUploadOptions() {
    let actionSheet = this.util
      .createImageUploadActionSheet(this.getImage.bind(this));
    actionSheet.present();
  }

  async getImage(sourceType: PictureSourceType) {
    options.sourceType = sourceType;

    /**
     * TODO: get pic usinf FILE_URI.
     */
    try {
      var loader = this.loadingProvider.showLoading()
      const user = this.auth.getActiveUser();
      let picData = await this.camera.getPicture(options);

      picData = 'data:image/jpeg;base64,' + picData;
      const ref = firebase.storage().ref().child('profileImages')
        .child(user.uid);
      ref.putString(picData, firebase.storage.StringFormat.DATA_URL);

      const url = await ref.getDownloadURL();
      await user.updateProfile({
        displayName: user.displayName,
        photoURL: url
      });
      firebase.database().ref().child('users').child(user.uid).update({
        photoURL: url
      })
      this.loadingProvider.dismiss(loader);
      this.changeDetection.detectChanges();
    } catch (error) {
      this.loadingProvider.dismiss(loader);
      this.alertProvider
        .showAlert('profile pic upload failed.', 'profile pic update failed');
    }
  }


  updateDisplayName() {
    const activeUser = this.auth.getActiveUser();
    const loader = this.loadingProvider.showLoading();
    activeUser.updateProfile({
      displayName: this.user.displayName,
      photoURL: this.user.photoURL
    }).then(() => {
      firebase.database().ref().child('users').child(activeUser.uid)
        .update({
          displayName: this.user.displayName
        });
      this.loadingProvider.dismiss(loader);
    })
  }
  onNext() {
    const user = this.auth.getActiveUser();
    user.updateProfile({
      displayName: this.user.displayName,
      photoURL: user.photoURL,
    }).then(
      this.onSuccessfullProfileCreation.bind(this),
      this.onFailed.bind(this));
  }
  onSuccessfullProfileCreation() {
    const currentUser = this.auth.getActiveUser();
    const user = {} as User;
    user.createdDate = Date.now() + '';
    user.isActive = true;
    user.displayName = currentUser.displayName;
    user.photoURL = currentUser.photoURL;
    user.phoneNumber = currentUser.phoneNumber;

    firebase.database().ref().child('users').child(currentUser.uid).set(user);
    this.navCtrl.setRoot(HomePage);
  }
  onFailed() {
    this.alertProvider
      .showAlert('profile creation failed',
        'profile creation failed');
  }
}
