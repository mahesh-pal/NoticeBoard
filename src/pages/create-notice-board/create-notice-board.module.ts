import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Contacts } from '@ionic-native/contacts';
import { CreateNoticeBoardPage } from './create-notice-board';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { NoticeBoardDetailsPageModule } from '../notice-board-details/notice-board-details.module';

@NgModule({
  declarations: [
    CreateNoticeBoardPage,
  ],
  providers: [
    Contacts,
  ],
  imports: [
    IonicPageModule.forChild(CreateNoticeBoardPage),
    NoticeBoardDetailsPageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule

  ],
  entryComponents: [
    CreateNoticeBoardPage,
  ]
})
export class CreateNoticeBoardPageModule {

}
