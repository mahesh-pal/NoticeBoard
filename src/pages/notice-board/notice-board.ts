import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoticeBoard } from '../../models/notice-board';

@IonicPage()
@Component({
  selector: 'page-notice-board',
  templateUrl: 'notice-board.html',
})
export class NoticeBoardPage {
noticeBoard:NoticeBoard;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.noticeBoard = this.navParams.data;
  }

}
