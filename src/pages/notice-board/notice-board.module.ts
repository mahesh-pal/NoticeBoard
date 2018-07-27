import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticeBoardPage } from './notice-board';

@NgModule({
  declarations: [
    NoticeBoardPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticeBoardPage),
  ], entryComponents: [NoticeBoardPage,]
})
export class NoticeBoardPageModule {}
