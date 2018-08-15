import 'rxjs/add/operator/map';

import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { CreateNoticeBoardPage } from '../create-notice-board/create-notice-board';
import { NavController } from 'ionic-angular';
import { NoticeBoardPage } from '../notice-board/notice-board';
import { Observable } from '../../../node_modules/rxjs';

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
    private afDb: AngularFireDatabase) {
    this.currentUser = this.authProvider.getActiveUser();
    this.noticeBoards$ = this.afDb
      .list('users/' + this.currentUser.uid + '/boards')
      .valueChanges()
  }
}
