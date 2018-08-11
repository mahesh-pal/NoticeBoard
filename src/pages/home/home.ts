import { ChangeDetectorRef, Component } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
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
  noticeBoards$;
  userDbRef;
  currentUser;
  noticeBoardPage = NoticeBoardPage;
  createNoticeBoardPage = CreateNoticeBoardPage;
  constructor(private nav: NavController,
    public authProvider: AuthProvider,
    private chageDetectionRef: ChangeDetectorRef,
    private afDb: AngularFireDatabase) {
  }
  ionViewWillEnter() {
    this.currentUser = this.authProvider.getActiveUser();
    this.noticeBoards$ = this.afDb
      .list('users/' + this.currentUser.uid + '/boards').valueChanges()
  }
}