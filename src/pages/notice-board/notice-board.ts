import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoticeBoard } from '../../models/notice-board';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { Message } from '../../models/message';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-notice-board',
  templateUrl: 'notice-board.html',
})
export class NoticeBoardPage {
  noticeBoard: NoticeBoard;
  message: string = '';
  messages: Message[] = [];
  messageBoardRef;
  admins: any = {};


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private changeDetectionRef: ChangeDetectorRef,
    public auth: AuthProvider) {
    this.noticeBoard = this.navParams.data;
    this.messageBoardRef = firebase.database().ref().child('boards')
      .child(this.noticeBoard.id);


    this.messageBoardRef.child('messages')
      .on('value', this.onMessageReceive.bind(this));
  }

  ionViewWillEnter() {

    this.messageBoardRef.child('admins').on('value', (snap) => {
      const admins = snap.val();
      if (admins) {
        for (const admin of admins) {
          firebase.database().ref().child('users').child(admin)
            .once('value', (userSnap) => {
              const user = userSnap.val();
              if (user) {
                this.admins[admin] = user;
              }
              this.changeDetectionRef.detectChanges();
            });
        }
      }
    });
  }

  onSendMessage(event) {
    if (event.keyCode == 13) {
      const messageText = this.message;
      this.message = '';
      this.messageBoardRef.child('messages')
        .push({
          text: messageText,
          createdAt: Date.now(),
          createdBy: this.auth.getActiveUser().uid
        })
    }
  }

  onMessageReceive(snap) {
    const messages = snap.val() || [];
    this.messages = [];
    const messageKeys = Object.keys(messages);
    for (const messageKey of messageKeys) {
      this.messages.push({
        id: messageKey,
        text: messages[messageKey].text,
        createdAt: messages[messageKey].createdAt,
        createdBy: messages[messageKey].createdBy,
      })
    }
    setTimeout(() => {
      this.changeDetectionRef.detectChanges();
    }, 0)
  }
}
