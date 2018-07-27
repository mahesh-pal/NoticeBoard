import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-otp-validation',
  templateUrl: 'otp-validation.html',
})
export class OtpValidationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  validateOtp(){
    this.navCtrl.setRoot(HomePage);
  }

}
