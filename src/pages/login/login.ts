import {Component }from '@angular/core'; 
import {IonicPage, NavController, NavParams }from 'ionic-angular'; 

import {LoadingProvider }from '../../providers/loading/loading'; 
import {OtpValidationPage }from '../otp-validation/otp-validation'; 
import {AlertProvider}from '../../providers/alert/alert'; 
@IonicPage()
@Component( {
selector:'page-login', 
templateUrl:'login.html', 
})
export class LoginPage {
mobileNumber:number; 
// Current support is only for India
countryCode = '+91'; 
constructor(public navCtrl:NavController, private loadingProvider:LoadingProvider, private alertProvider:AlertProvider) {
}

// Send an OTP on user's phone.
sendOTP() {
let phoneNumber = this.countryCode + this.mobileNumber;
const loader = this.loadingProvider.showLoading();
( < any > window).FirebasePlugin.verifyPhoneNumber(phoneNumber, 60, (credentials) =>  {
  this.loadingProvider.dismiss(loader);
  this.navCtrl.push(OtpValidationPage,
    {verificationId:credentials.verificationId, instantVerification:credentials.instantVerification})
}, (error) =>  {
this.loadingProvider.dismiss(loader);
this.alertProvider.showAlert(error.message||'Please check your mobile number','login failed');
});
}
}
