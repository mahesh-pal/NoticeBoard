import { Loading, LoadingController } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
        if (loader)
            loader.dismiss();
    }

}
