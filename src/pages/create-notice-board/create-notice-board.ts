import 'rxjs/add/operator/first';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { Contacts } from '@ionic-native/contacts';
import { DomSanitizer } from '@angular/platform-browser';
import { NoticeBoardDetailsPage } from '../notice-board-details/notice-board-details';
import { User } from '../../models/user';
import { subscribeOn } from '../../../node_modules/rxjs/operator/subscribeOn';

@IonicPage()
@Component({
  selector: 'page-create-notice-board',
  templateUrl: 'create-notice-board.html',
})
export class CreateNoticeBoardPage {
  selectedUsers: boolean[] = [];
  users: User[] = [];
  uids: Array<string> = [];
  DETAIL_PAGE = NoticeBoardDetailsPage;
  //Selected contacts to be added to board.
  contactList: string[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private contactService: Contacts,
    public sanitizer: DomSanitizer,
    private auth: AuthProvider,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
  }

  ionViewWillEnter() {
    this.contactService.find(['phoneNumbers'],
      { filter: '', multiple: true })
      .then(this.onContactRetrival.bind(this));
  }

  onContactRetrival(contacts) {
    const currentUser = this.auth.getActiveUser();
    for (const contact of contacts) {
      if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
        this.contactList.push(contact.phoneNumbers[0].value);
      }
    }
    for (let contact of this.contactList) {
      contact = contact.replace(/[|#|_|]/g, '').replace(/\s\s+/g, '');
      this.afDatabase.object('userPhoneMappings/' + contact).valueChanges()
        .first().subscribe(user => {
          if (user && user.uid !== currentUser.uid)
            this.users.push(user as User);
        });
    }
  }

  navigateToDetailPage() {
    this.uids = [];
    this.selectedUsers.forEach((isSelected, index) => {
      if (isSelected) {
        this.uids.push(this.users[index].uid);
      }
    });
    this.navCtrl.push(this.DETAIL_PAGE, this.uids);
  }
}

