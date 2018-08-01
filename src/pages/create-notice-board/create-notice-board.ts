import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact} from '@ionic-native/contacts';
import { NoticeBoardDetailsPage } from '../notice-board-details/notice-board-details';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-create-notice-board',
  templateUrl: 'create-notice-board.html',
})
export class CreateNoticeBoardPage {
  @ViewChild('form') form1:NgForm
  isPoneNumberSelected:boolean[] = [];
  contacts: Contact[] = [];
  phoneNumbers:Array<string> = [];
  DETAIL_PAGE = NoticeBoardDetailsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactService: Contacts, public sanitizer: DomSanitizer) {
    this.contactService.find(['id', 'displayName', 'photos','phoneNumbers'], { filter: '', multiple: true })
      .then(data => {
        this.contacts=data.sort((contact1,contact2)=>{
          const name1 = contact1.displayName;
          const name2 = contact2.displayName;
          if (name1 && name2){
            if (name1.toLocaleLowerCase() < name2.toLocaleLowerCase()) return -1;
            if (name1.toLocaleLowerCase() > name2.toLocaleLowerCase()) return 1;
          }
          return 0;
        });
      });
  }

  gotoDetailPage(){
    this.isPoneNumberSelected.forEach((isSelected,index) => {
      if (isSelected) {
        if (this.contacts[index].phoneNumbers &&
            this.contacts[index].phoneNumbers.length > 0) {
          this.phoneNumbers.push(this.contacts[index].phoneNumbers[0].value);
        }
      }
    });
    this.navCtrl.push(this.DETAIL_PAGE,this.phoneNumbers);
  }

}
