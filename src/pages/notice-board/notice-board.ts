import 'rxjs/add/operator/map'

import { Content, IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { NoticeBoard } from '../../models/notice-board';

@IonicPage()
@Component({
  selector: 'page-notice-board',
  templateUrl: 'notice-board.html',
})
export class NoticeBoardPage {
  noticeBoard: NoticeBoard;
  message: string = '';
  messages$;
  messageBoardRef;
  admins: any = {};
  currentUser;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    private afDb: AngularFireDatabase) {
    this.currentUser = this.auth.getActiveUser();
    this.noticeBoard = this.navParams.data;
    this.messages$ = this.afDb
      .list('boards/' + this.noticeBoard.id + '/messages', (ref) => {
        return ref.orderByChild('createdAt').limitToLast(10);
      })
      .valueChanges();
  }

  ionViewWillEnter() {
    this.afDb.object('boards/' + this.noticeBoard.id + '/admins').valueChanges().subscribe(admins => {
      this.admins = admins;
    });
  }

  onSendMessage(event) {
    if (event.keyCode == 13) {
      const messageText = this.message;
      this.message = '';
      this.afDb.list('boards/' + this.noticeBoard.id + '/messages')
        .push({
          text: messageText,
          createdAt: Date.now(),
          createdBy: this.auth.getActiveUser().uid
        })
    }
  }
}
;