import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import firebase from 'firebase';

import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { LoadingProvider } from '../providers/loading/loading';
import { User } from '../models/user';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  user: User;
  profile = ProfilePage;
  settings = SettingsPage;
  @ViewChild('nav') content: NavController;

  constructor(platform: Platform, private keyboard: Keyboard,
    statusBar: StatusBar, splashScreen: SplashScreen,
    authProvider: AuthProvider, private menuCtrl: MenuController,
    private loadingProvider: LoadingProvider) {
    //disable keyboard scroll. this line prevents UI getting distorted on
    //android device.
    this.keyboard.disableScroll(true);
    // Making Authentication persistance
    firebase.auth().setPersistence(
      firebase.auth.Auth.Persistence.LOCAL);

    const loader = this.loadingProvider.showLoading();
    //Check if user is logged in.
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      this.loadingProvider.dismiss(loader);
      if (user) {
        //authProvider.isAuthenticated = true;
        this.rootPage = HomePage;
        this.user = user;
      } else {
        // authProvider.isAuthenticated = false;
        this.rootPage = LoginPage;
        this.user = null;
      }
      unsubscribe();
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  logout() {
    firebase.auth().signOut();
    this.content.setRoot(LoginPage);
  }
}
