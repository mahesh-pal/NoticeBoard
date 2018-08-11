import { IonicPage, Loading, NavController, NavParams } from 'ionic-angular';

import { AlertProvider } from '../../providers/alert/alert';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { LoadingProvider } from '../../providers/loading/loading';
import { ProfilePage } from '../profile/profile';
import { UserCredential } from 'firebase/auth';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-otp-validation',
  templateUrl: 'otp-validation.html',
})
export class OtpValidationPage {
  varificationId: string;
  otp: string;
  loader: Loading | null = null;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private loadingProvider: LoadingProvider,
    private alertProvider: AlertProvider,
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase) {
    this.varificationId = this.navParams.data.verificationId
  }

  validateOTP() {
    this.loader = this.loadingProvider.showLoading('verifying OTP...');
    let signInCredential = firebase.auth.PhoneAuthProvider
      .credential(this.varificationId, this.otp);
    // sign in with the otp entered by user.
    this.afAuth.auth.signInAndRetrieveDataWithCredential(signInCredential)
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
    this.afDb.object('users/' + uid).valueChanges()
      .first().subscribe(existingUser => {
        if (existingUser) {
          this.navCtrl.setRoot(HomePage);
        } else {
          this.navCtrl.setRoot(ProfilePage, { createUser: true });
        }
      });
  };
}

