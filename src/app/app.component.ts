import {Component, ViewChild }from '@angular/core';
import {Platform, NavController, MenuController }from 'ionic-angular';
import {StatusBar }from '@ionic-native/status-bar';
import {SplashScreen }from '@ionic-native/splash-screen';

import {LoginPage}from '../pages/login/login';
import {AuthProvider }from '../providers/auth/auth';
import firebase from 'firebase';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginPage } from '../pages/login/login';
import {ProfilePage }from '../pages/profile/profile';
import {HomePage }from '../pages/home/home';
import {SettingsPage}from '../pages/settings/settings';

@Component( {
  templateUrl:'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  profilePage = ProfilePage
  settingsPage = SettingsPage;
  profilePic = '';

  @ViewChild('content')content:NavController;

  constructor(platform:Platform,private keyboard:Keyboard, statusBar:StatusBar, splashScreen:SplashScreen, authProvider:AuthProvider, private menuCtrl:MenuController) {
    this.keyboard.disableScroll(true);
    this.rootPage = LoginPage;
    firebase.auth().onAuthStateChanged(user =>  {
      if (user) {
        authProvider.isAuthenticated = true;
      }else {
        authProvider.isAuthenticated = false;
        this.rootPage = LoginPage;
      }
    });
    platform.ready().then(() =>  {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToPage(page) {
    this.content.push(page);
    this.menuCtrl.close();
  }
  logout(){
    firebase.auth().signOut();
    this.menuCtrl.close();
    this.content.setRoot(LoginPage);
  }
}
