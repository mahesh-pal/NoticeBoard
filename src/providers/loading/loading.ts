import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoadingProvider {

    constructor(public loadingCtrl: LoadingController) {
    }

    create(message) {
        return this.loadingCtrl.create({
            content: message,
        });
    }

    showLoading(message = 'Please wait...') {
        const loader = this.create(message);
        loader.present();
        return loader;
    }

    dismiss(loader: Loading) {
        loader.dismiss();
    }

}
