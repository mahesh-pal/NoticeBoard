import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-notice-board-details',
  templateUrl: 'notice-board-details.html',
})
export class NoticeBoardDetailsPage {
  phoneNumbers:string[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.phoneNumbers = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticeBoardDetailsPage');
  }

}
