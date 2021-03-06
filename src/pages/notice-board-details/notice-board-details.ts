import { Camera, CameraOptions, PictureSourceType } from '../../../node_modules/@ionic-native/camera';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertProvider } from '../../providers/alert/alert';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { LoadingProvider } from '../../providers/loading/loading';
import { NoticeBoard } from '../../models/notice-board';
import { UtilProvider } from '../../providers/util/util';

const options: CameraOptions = {
  quality: 100,
  destinationType: 0,
  mediaType: 0,
  targetHeight: 210,
  targetWidth: 210,
  allowEdit: true,
}

@IonicPage()
@Component({
  selector: 'page-notice-board-details',
  templateUrl: 'notice-board-details.html',
})
export class NoticeBoardDetailsPage {
  userIds: string[];
  boardName = '';
  description = '';
  url = '';
  boardKey: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams, private auth: AuthProvider,
    private loadingProvider: LoadingProvider,
    private camera: Camera,
    private afDb: AngularFireDatabase,
    private alertProvider: AlertProvider,
    private util: UtilProvider,
    private afStorage: AngularFireStorage) {
    this.userIds = this.navParams.data;
    this.boardKey = this.afDb.createPushId();
  }

  createNoticeBoard() {
    const currentUser = this.auth.getActiveUser();
    this.userIds.push(currentUser.uid);
    const loader = this.loadingProvider.showLoading('creating group');
    const admin = {};
    admin[currentUser.uid] = { uid: currentUser.uid, displayName: currentUser.displayName };
    const board = {
      createdBy: currentUser.uid,
      createdDate: Date.now() + '',
      boardName: this.boardName,
      users: [...this.userIds],
      description: this.description,
      admins: admin
      ,
      imageUrl: this.url
    } as NoticeBoard;


    const updates = {};

    for (const uid of this.userIds) {
      updates['users/' + uid + '/boards/' + this.boardKey] =
        {
          boardName: this.boardName,
          imageUrl: this.url,
          description: this.description,
          id: this.boardKey,
        }
    }
    updates['boards/' + this.boardKey] = board;
    this.afDb.object('/').update(updates).then(() => {
      this.loadingProvider.dismiss(loader);
      this.navCtrl.setRoot(HomePage);
    }, () => {
      this.loadingProvider.dismiss(loader);
      this.alertProvider.showAlert('group creation failed', 'failed');
    })
  }

  getUploadOptions() {
    this.util.createImageUploadActionSheet(this.getImage.bind(this))
      .present();
  }

  async getImage(sourceType: PictureSourceType) {
    options.sourceType = sourceType;

    /**
     * TODO: get pic usinf FILE_URI.
     */
    try {
      var loader = this.loadingProvider.showLoading()
      const user = this.auth.getActiveUser();
      let picData = await this.camera.getPicture(options);

      picData = 'data:image/jpeg;base64,' + picData;

      const storageRef = this.afStorage.ref('boardsImages/' + this.boardKey);

      storageRef.putString(picData, 'data_url').then(snapshot => {
        storageRef.getDownloadURL().subscribe(url => {
          this.loadingProvider.dismiss(loader);
          this.url = url;
        });
      })
    } catch (error) {
      console.log(error);
      this.loadingProvider.dismiss(loader);
      this.alertProvider
        .showAlert('profile pic upload failed.',
          'profile pic update failed');
    }
  }

}


