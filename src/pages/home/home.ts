import { ChangeDetectorRef, Component } from '@angular/core';
import firebase, { User } from 'firebase';

import { AuthProvider } from '../../providers/auth/auth';
import { CreateNoticeBoardPage } from '../create-notice-board/create-notice-board';
import { NavController } from 'ionic-angular';
import { NoticeBoard } from '../../models/notice-board';
import { NoticeBoardPage } from '../notice-board/notice-board';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  noticeBoards: NoticeBoard[] = [];
  userDbRef;
  currentUser: User;
  noticeBoardPage = NoticeBoardPage;
  createNoticeBoardPage = CreateNoticeBoardPage;
  constructor(private nav: NavController,
    public authProvider: AuthProvider,
    private chageDetectionRef: ChangeDetectorRef) {
  }
  ionViewWillEnter() {
    this.currentUser = this.authProvider.getActiveUser();
    this.userDbRef = firebase.database().ref().child('users')
      .child(this.currentUser.uid).child('boards');
    this.userDbRef.on('value', this.getBoardsForUser.bind(this));
  }

  ionViewDidLeave() {
    this.userDbRef.off();
  }

  getBoardsForUser(snap) {
    if (!snap.val()) return;
    this.noticeBoards = [];
    const boards = snap.val();
    // TODO: better way to iterate snapshot
    const boardsIds = Object.keys(boards);
    for (const boardId of boardsIds) {
      const board = boards[boardId] as NoticeBoard;
      board.id = boardId;
      this.noticeBoards.push(board);
    }
    // Running ChangeDetection manually
    setTimeout(() => {
      this.chageDetectionRef.detectChanges();
    }, 0);
  }
}
