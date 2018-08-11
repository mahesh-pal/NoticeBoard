import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth'
import { Injectable } from '@angular/core';

@Injectable()
export class AuthProvider {
    private currentUser: firebase.User;
    constructor(private auth: AngularFireAuth) {
        auth.authState.subscribe((user: firebase.User) => {
            this.currentUser = user
        });
    }
    getActiveUser() {
        return this.currentUser;
    }
}