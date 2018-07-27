import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreateNoticeBoardPage } from '../create-notice-board/create-notice-board';
import { noticeBoards } from '../../mock-data/groups';
import { NoticeBoard } from '../../models/notice-board';
import { NoticeBoardPage } from '../notice-board/notice-board';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  noticeBoards: NoticeBoard[];
  constructor(private nav: NavController) {
    this.noticeBoards = noticeBoards;
  }

  createNoticeBoard() {
    this.nav.push(CreateNoticeBoardPage);
  }
  gotoNoticeBoard(noticeBoard: NoticeBoard) {
    this.nav.push(NoticeBoardPage, noticeBoard);
  }
}
