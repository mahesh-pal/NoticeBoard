import {Component }from '@angular/core'; 
import {IonicPage, NavController, NavParams }from 'ionic-angular'; 
import {HomePage }from '../home/home'; 
import firebase from 'firebase'; 
import {LoadingProvider }from '../../providers/loading/loading'; 
import {AlertProvider }from '../../providers/alert/alert'; 

@IonicPage()
@Component( {
selector:'page-otp-validation', 
templateUrl:'otp-validation.html', 
})
export class OtpValidationPage {
varificationId:string; 
otp:string; 
constructor(public navCtrl:NavController, public navParams:NavParams, private loadingProvider:LoadingProvider, private alertProvider:AlertProvider ) {
this.varificationId = navParams.data.verificationId
}

validateOtp() {
const loader = this.loadingProvider.showLoading('verifying OTP...'); 
let signInCredential = firebase.auth.PhoneAuthProvider.credential(this.varificationId, this.otp); 
firebase.auth().signInAndRetrieveDataWithCredential(signInCredential).then((response) =>  {
this.loadingProvider.dismiss(loader); 
this.navCtrl.setRoot(HomePage); 
}, (reject) =>  {
this.loadingProvider.dismiss(loader); 
this.alertProvider.showAlert('OTP failed!', ''); 
})

}

}
