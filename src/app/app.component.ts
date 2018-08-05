import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';
import firebase from 'firebase';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { Storage } from '@ionic/storage';
import { LoadingProvider } from '../providers/loading/loading';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  profilePage = ProfilePage
  settingsPage = SettingsPage;
  user;

  @ViewChild('content') content: NavController;

  constructor(platform: Platform, private keyboard: Keyboard,
    statusBar: StatusBar, splashScreen: SplashScreen,
    authProvider: AuthProvider,
    private menuCtrl: MenuController,
    private changeDetectionRef: ChangeDetectorRef,
    private loadingProvider: LoadingProvider) {
    this.keyboard.disableScroll(true);

    firebase.auth().setPersistence(
      firebase.auth.Auth.Persistence.LOCAL);


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      const loader = this.loadingProvider.showLoading();
      firebase.auth().onAuthStateChanged(user => {
        this.loadingProvider.dismiss(loader);
        if (user) {
          authProvider.isAuthenticated = true;
          this.rootPage = HomePage;
          this.user = user;
        } else {
          authProvider.isAuthenticated = false;
          this.rootPage = LoginPage;
          this.user = null;
        }
        this.changeDetectionRef.detectChanges();
      });
    });
  }
  goToPage(page) {
    this.content.push(page);
    this.menuCtrl.close();
  }
  logout() {
    firebase.auth().signOut();
    this.menuCtrl.close();
    this.content.setRoot(LoginPage);
  }
}
