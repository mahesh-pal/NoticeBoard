import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import firebase from 'firebase';

import { HomePage } from '../home/home';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { UserCredential } from 'firebase/auth';
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-otp-validation',
  templateUrl: 'otp-validation.html',
})
export class OtpValidationPage {
  varificationId: string;
  otp: string;
  loader: Loading | null = null;
  dbRef = firebase.database().ref();
  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private loadingProvider: LoadingProvider,
    private alertProvider: AlertProvider,
    private storage: Storage) {
    this.varificationId = this.navParams.data.verificationId
  }

  validateOTP() {
    this.loader = this.loadingProvider.showLoading('verifying OTP...');
    let signInCredential = firebase.auth.PhoneAuthProvider
      .credential(this.varificationId, this.otp);
    // sign in with the otp entered by user.
    firebase.auth().signInAndRetrieveDataWithCredential(signInCredential)
      .then(this.onSuccessfullValidation.bind(this),
        this.onFailedValidation.bind(this));
  }

  // This method executes if user enters correct OTP.
  onSuccessfullValidation(authenticatedUser: UserCredential) {
    this.loadingProvider.dismiss(this.loader);
    this.createOrSignInUser(authenticatedUser);
  }


  onFailedValidation(reason: any) {
    this.loadingProvider.dismiss(this.loader);
    this.alertProvider.showAlert('Please check the entered OTP.', 'OTP validation failed')
  }

  createOrSignInUser(user: UserCredential) {
    const { uid } = user.user;
    const userRef = this.dbRef.child('users');
    firebase.auth().currentUser.getIdToken().then(token => {
      console.log(token);
      this.storage.set('token', token);
    })
    userRef.once('value', (snap) => {
      if (snap.child(uid).exists()) {
        this.navCtrl.setRoot(HomePage);
      } else {
        this.navCtrl.setRoot(ProfilePage, { createUser: true });
      }
    });


  }

}
