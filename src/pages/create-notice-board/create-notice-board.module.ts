import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {Contacts} from '@ionic-native/contacts';

import { CreateNoticeBoardPage } from './create-notice-board';
import { NoticeBoardDetailsPageModule } from '../notice-board-details/notice-board-details.module';

@NgModule({
  declarations: [
    CreateNoticeBoardPage,
  ],
  providers:[
    Contacts,
  ],
  imports: [
    IonicPageModule.forChild(CreateNoticeBoardPage),
    NoticeBoardDetailsPageModule

  ],
  entryComponents:[
    CreateNoticeBoardPage,
  ]
})
export class CreateNoticeBoardPageModule {

}
