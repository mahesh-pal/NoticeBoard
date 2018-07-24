import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {Contacts} from '@ionic-native/contacts';

import { CreateNoticeBoardPage } from './create-notice-board';

@NgModule({
  declarations: [
    CreateNoticeBoardPage,
  ],
  providers:[
    Contacts,
  ],
  imports: [
    IonicPageModule.forChild(CreateNoticeBoardPage),

  ],
  entryComponents:[
    CreateNoticeBoardPage,
  ]
})
export class CreateNoticeBoardPageModule {}
