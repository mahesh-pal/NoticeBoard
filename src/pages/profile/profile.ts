import 'rxjs/add/operator/first';

import { ActionSheetController, IonicPage, NavController, TextInput } from 'ionic-angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';

import { AlertProvider } from '../../providers/alert/alert';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { LoadingProvider } from '../../providers/loading/loading';
import { NavParams } from 'ionic-angular';
import { ReplaySubject } from '../../../node_modules/rxjs/Rx';
import { User } from '../../models/user';
import { UtilProvider } from '../../providers/util/util';
import firebase from 'firebase';

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
  isCreateUser;

  constructor(public navCtrl: NavController,
    private util: UtilProvider,
    private auth: AuthProvider,
    private camera: Camera,
    private loadingProvider: LoadingProvider,
    private alertProvider: AlertProvider,
    private changeDetection: ChangeDetectorRef,
    private navParam: NavParams,
    private afDb: AngularFireDatabase) {
    this.isCreateUser = !!this.navParam.data.createUser;
    const user = this.auth.getActiveUser();
    this.user = {
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
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
      });

      this.loadingProvider.dismiss(loader);
      setTimeout(() => {
        this.changeDetection.detectChanges();
      }, 0)
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
      this.afDb.object('users/' + activeUser.uid)
        .update({
          displayName: this.user.displayName
        }).then(() => {
          this.afDb.object('userPhoneMappings/' + activeUser.phoneNumber)
            .update({
              displayName: this.user.displayName
            })
          this.loadingProvider.dismiss(loader);
        });;
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
    user.displayName = this.user.displayName;
    user.photoURL = currentUser.photoURL;
    user.phoneNumber = currentUser.phoneNumber;
    const updates = {};
    updates['users/' + currentUser.uid] = user;
    updates['userPhoneMappings/' + currentUser.phoneNumber] =
      {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      };
    this.afDb.object('/').update(updates).then((success) => {
      this.navCtrl.setRoot(HomePage);
    }, (error) => {
      console.log(error.message);
    });
  }

  onFailed() {
    this.alertProvider
      .showAlert('profile creation failed',
        'profile creation failed');
  }
}

