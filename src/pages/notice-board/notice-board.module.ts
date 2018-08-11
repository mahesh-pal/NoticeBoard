import { AngularFireDatabaseModule } from 'angularfire2/database'
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { NoticeBoardPage } from './notice-board';

@NgModule({
  declarations: [
    NoticeBoardPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticeBoardPage),
    AngularFireDatabaseModule,
  ], entryComponents: [NoticeBoardPage,],

})
export class NoticeBoardPageModule { }
