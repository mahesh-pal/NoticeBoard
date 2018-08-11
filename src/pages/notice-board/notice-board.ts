import { ChangeDetectorRef, Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Message } from '../../models/message';
import { NoticeBoard } from '../../models/notice-board';
import firebase from 'firebase';

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
    private changeDetectionRef: ChangeDetectorRef,
    public auth: AuthProvider,
    private afDb: AngularFireDatabase) {
    this.currentUser = this.auth.getActiveUser();
    this.noticeBoard = this.navParams.data;
    this.messages$ = this.afDb.list('boards/' + this.noticeBoard.id + '/messages')
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