import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { LoadingProvider } from '../../providers/loading/loading';
import { NoticeBoard } from '../../models/notice-board';


@IonicPage()
@Component({
  selector: 'page-notice-board-details',
  templateUrl: 'notice-board-details.html',
})
export class NoticeBoardDetailsPage {
  uids: string[];
  dbRef = firebase.database().ref();
  boardName = '';
  description = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams, private auth: AuthProvider,
    private loadingProvider: LoadingProvider) {
    this.uids = this.navParams.data;
  }

  createNoticeBoard() {
    const currentUser = this.auth.getActiveUser();
    this.uids.push(currentUser.uid);
    const loader = this.loadingProvider.showLoading('creating group');
    const board = {
      createdBy: currentUser.uid,
      createdDate: Date.now() + '',
      boardName: this.boardName,
      users: [...this.uids],
      description: this.description,
    } as NoticeBoard;

    this.dbRef.child('boards')
      .push(board)
      .then((res) => {
        this.loadingProvider.dismiss(loader);
        this.onSuccessfullGroupCreation(res);
      });
  }

  onSuccessfullGroupCreation(res) {
    const loader = this.loadingProvider.showLoading('adding group members');
    const promises = [];
    for (const id of this.uids) {
      promises.push(this.dbRef.child('users').child(id).child('boards')
        .child(res.key).set({
          boardName: this.boardName
        }));
    }
    Promise.all(promises).then(() => {
      this.loadingProvider.dismiss(loader);
      this.navCtrl.setRoot(HomePage);
    });

  }
}
