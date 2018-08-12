import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class FcmProvider {

  constructor(private platform: Platform, private db: AngularFireDatabase, private auth: AuthProvider) {
    (<any>window).FirebasePlugin.hasPermission(function (data) {
      console.log("permission" + data.isEnabled);
    });
  }

  getToken() {
    console.log(this.platform.is('android'));
    console.log(this.platform.is('cordova'));
    if (this.platform.is('android')) {
      (<any>window).FirebasePlugin.getToken((token) => {
        this.saveToken(token);
      }, (error) => {
        console.log('error ' + error);
      });
    }
  }

  saveToken(token) {
    if (!token) return;
    this.db.object('devices/' + token).set({
      token,
      uid: this.auth.getActiveUser().uid,
    }).then(() => {
      console.log('token saved');
    }, () => {
      console.log("error saving token");
    })
  }
  listenForNotification(callback) {
    console.log('will listen to message');
    (<any>window).FirebasePlugin.onNotificationOpen((message) => {
      console.log(message);
    }, () => {
      console.log('Error while listening to messages')
    });
  }

}
