import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';
import { FcmProvider } from '../providers/fcm/fcm';
import { HomePage } from '../pages/home/home';
import { Keyboard } from '@ionic-native/keyboard';
import { LoadingProvider } from '../providers/loading/loading';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { User } from '../models/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  user: User;
  profile = ProfilePage;
  settings = SettingsPage;
  @ViewChild('nav') navCtrl: NavController;

  constructor(platform: Platform, private keyboard: Keyboard,
    statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private loadingProvider: LoadingProvider,
    private authPrpvider: AngularFireAuth,
    private db: AngularFireDatabase,
    private auth: AuthProvider,
    private fcm: FcmProvider) {
    //disable keyboard scroll. this line prevents UI getting distorted on
    //android device.
    this.keyboard.disableScroll(true);

    // Making Authentication persistance

    // firebase.auth().setPersistence(
    //  firebase.auth.Auth.Persistence.LOCAL);
    //this.authPrpvider.auth.setPersistence(this.authPrpvider.auth.Persistence.LOCAL)
    const loader = this.loadingProvider.showLoading();
    //Check if user is logged in.
    const subscription = this.authPrpvider.authState.subscribe(user => {
      this.loadingProvider.dismiss(loader);
      if (user) {
        //authProvider.isAuthenticated = true;
        this.rootPage = HomePage;
        this.user = user;
        this.auth.currentUser = user;
        this.fcm.getToken();
        this.fcm.listenForNotification(((message) => {
          console.log(message)
        }));
        subscription.unsubscribe();
      } else {
        // authProvider.isAuthenticated = false;
        this.rootPage = LoginPage;
        this.user = null;
      }

    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


    });
  }

  logout() {
    this.authPrpvider.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
    this.menuCtrl.close();
  }
  navigateTo(page) {
    this.navCtrl.push(page);
    this.menuCtrl.close();
  }
}