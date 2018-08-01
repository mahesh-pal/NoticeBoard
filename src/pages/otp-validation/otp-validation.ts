import {Component }from '@angular/core';
import {IonicPage, NavController, NavParams,Loading }from 'ionic-angular';
import firebase from 'firebase';

import {HomePage }from '../home/home';
import {LoadingProvider }from '../../providers/loading/loading';
import {AlertProvider }from '../../providers/alert/alert';
import { UserCredential} from 'firebase/auth';

@IonicPage()
@Component( {
selector:'page-otp-validation',
templateUrl:'otp-validation.html',
})
export class OtpValidationPage {
  varificationId:string;
  otp:string;
  loader: Loading|null=null;
  dbRef = firebase.database().ref();
  constructor(public navCtrl:NavController, public navParams:NavParams,
    private loadingProvider:LoadingProvider,
    private alertProvider:AlertProvider ) {
    this.varificationId = navParams.data.verificationId
  }

  validateOtp() {
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
  createOrSignInUser(user: UserCredential){
    const {uid,displayName,phoneNumber,photoURL} = user.user;
    const userRef = this.dbRef.child('users');

    userRef.once('value', (snap)=>{
    if(snap.child(uid).exists()){
      this.navCtrl.setRoot(HomePage);
    }else{
      this.dbRef.child('users').child(uid).set({
        displayName,
        phoneNumber,
        photoURL
      }).then(()=>{
        this.navCtrl.setRoot(HomePage);
      });

    }
    });


  }

}
