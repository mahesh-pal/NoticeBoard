import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OtpValidationPage } from '../otp-validation/otp-validation';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
mobileNumber:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
login(){
(<any>window).FirebasePlugin.verifyPhoneNumber('+919780180102',60,(credentials)=>{
console.log('sms send sucessfully');
  console.log(credentials.verificationId);
  console.log(credentials.instantVerification)
},(error)=>{
console.log(error);
})
}

}
