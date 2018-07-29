import {HttpClient }from '@angular/common/http'; 
import {Injectable }from '@angular/core'; 
import {AlertController }from 'ionic-angular'; 

@Injectable()
export class AlertProvider {

constructor(private alertCtrl:AlertController) {
}

createBasicAlert(message, title) {
return this.alertCtrl.create( {
title, 
subTitle:message, 
buttons:['Ok']
  }); 
}

showAlert(message, title) {
const alert = this.createBasicAlert(message, title); 
alert.present(); 
return alert; 
}
dismisAlert(alertCtrl) {
alertCtrl.dismiss(); 
}
}
