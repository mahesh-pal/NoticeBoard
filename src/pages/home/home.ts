import { Component, ChangeDetectorRef } from '@angular/core';

import { NavController } from 'ionic-angular';

import { CreateNoticeBoardPage } from '../create-notice-board/create-notice-board';
import { NoticeBoard } from '../../models/notice-board';
import { NoticeBoardPage } from '../notice-board/notice-board';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  noticeBoards: NoticeBoard[] = [];
  userDbRef;
  constructor(private nav: NavController,
    public authProvider: AuthProvider,
    private chageDetectionRef: ChangeDetectorRef) {
    const user = this.authProvider.getActiveUser();
    this.userDbRef = firebase.database().ref().child('users')
      .child(user.uid);

    this.userDbRef.child('boards')
      .on('value', snap => {
        if (snap.val()) {
          this.noticeBoards = [];
          const boards = snap.val();
          Object.keys(boards).forEach(key => {
            const board = boards[key] as NoticeBoard;
            board.id = key;
            this.noticeBoards.push(board);
          });
          setTimeout(() => {
            this.chageDetectionRef.detectChanges();
          }, 0)
        }
      });
  }

  createNoticeBoard() {
    this.nav.push(CreateNoticeBoardPage);
  }

  gotoNoticeBoard(noticeBoard: NoticeBoard) {
    this.nav.push(NoticeBoardPage, noticeBoard);
  }
}
