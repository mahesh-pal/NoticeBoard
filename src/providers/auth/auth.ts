import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {
    isAuthenticated = false;
    constructor() {
    }

    getActiveUser() {
        return firebase.auth().currentUser;
    }


}
