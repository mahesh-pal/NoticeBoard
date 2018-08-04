import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact } from '@ionic-native/contacts';
import { NoticeBoardDetailsPage } from '../notice-board-details/notice-board-details';
import { NgForm } from '@angular/forms';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-create-notice-board',
  templateUrl: 'create-notice-board.html',
})
export class CreateNoticeBoardPage {
  @ViewChild('form') form1: NgForm
  isPoneNumberSelected: boolean[] = [];
  users: User[];
  uids: Array<string> = [];
  DETAIL_PAGE = NoticeBoardDetailsPage;
  contactList: string[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private contactService: Contacts,
    public sanitizer: DomSanitizer,
    private auth: AuthProvider) {
    this.contactService.find(['phoneNumbers'], { filter: '', multiple: true })
      .then(this.onContactRetrival.bind(this));
  }

  onContactRetrival(contacts) {
    for (const contact of contacts) {
      if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
        this.contactList.push(contact.phoneNumbers[0].value);
      }
    }

    firebase.database().ref().child('users').once('value', snap => {
      const users = snap.val();
      const currentUserUid = this.auth.getActiveUser().uid;
      const uids = Object.keys(users)
        .filter(uid => uid != currentUserUid &&
          this.contactList.indexOf(users[uid].phoneNumber) != -1);

      this.users = [];
      for (const uid of uids) {
        const user = users[uid] as User;
        user.uid = uid;
        this.users.push(user);
      }
    });
  }

  gotoDetailPage() {
    this.uids = [];
    this.isPoneNumberSelected.forEach((isSelected, index) => {
      if (isSelected) {
        this.uids.push(this.users[index].uid);
      }
    });
    this.navCtrl.push(this.DETAIL_PAGE, this.uids);
  }
}
