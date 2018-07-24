import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact} from '@ionic-native/contacts';

@IonicPage()
@Component({
  selector: 'page-create-notice-board',
  templateUrl: 'create-notice-board.html',
})
export class CreateNoticeBoardPage {
  contacts: Contact[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private contactService: Contacts, public sanitizer: DomSanitizer) {
    this.contactService.find(['id', 'displayName', 'photos'], { filter: '', multiple: true })
      .then(data => {
        this.contacts=data.sort((contact1,contact2)=>{
          const name1 = contact1.displayName;
          const name2=contact2.displayName;
          if(name1 && name2){
            if (name1.toLocaleLowerCase() < name2.toLocaleLowerCase()) return -1;
            if (name1.toLocaleLowerCase() > name2.toLocaleLowerCase()) return 1;
          }

          return 0;
        });
      });
  }



}
