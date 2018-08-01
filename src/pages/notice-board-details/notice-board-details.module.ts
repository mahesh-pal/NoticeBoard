import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticeBoardDetailsPage } from './notice-board-details';

@NgModule({
  declarations: [
    NoticeBoardDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticeBoardDetailsPage),
  ], entryComponents: [NoticeBoardDetailsPage]
})
export class NoticeBoardDetailsPageModule {}
