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

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private auth: AuthProvider,
    private loadingProvider: LoadingProvider,
    private camera: Camera,
    private afDb: AngularFireDatabase,
    private alertProvider: AlertProvider,
    private util: UtilProvider,
    private afStorage: AngularFireStorage) {
    this.userIds = this.navParams.data;
  }

  createNoticeBoard() {
    const currentUser = this.auth.getActiveUser();
    this.userIds.push(currentUser.uid);
    const loader = this.loadingProvider.showLoading('creating group');
    const board = {
      createdBy: currentUser.uid,
      createdDate: Date.now() + '',
      boardName: this.boardName,
      users: [...this.userIds],
      description: this.description,
      admins: [currentUser.uid],
      imageUrl: this.url
    } as NoticeBoard;

    // Saving board to firebase
    this.afDb.list('boards')
      .push(board)
      .then((res) => {
        this.loadingProvider.dismiss(loader);
        this.onSuccessfullGroupCreation(res);
      });
  }

  getUploadOptions() {
    this.util.createImageUploadActionSheet(this.getImage.bind(this))
      .present();
  }

  onSuccessfullGroupCreation(res) {
    this.url = '';
    const loader = this.loadingProvider
      .showLoading('adding group members');
    const promises = [];
    for (const id of this.userIds) {
      promises.push(this.afDb.object('users/' + id + '/boards/' + res.key)
        .set({
          boardName: this.boardName
        }));
    }
    Promise.all(promises).then(() => {
      this.loadingProvider.dismiss(loader);
      this.navCtrl.setRoot(HomePage);
    });
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
      this.afStorage.upload('boardsImages', picData);
      this.afStorage.ref('boardsImages').getDownloadURL().subscribe((url) => {
        this.url = url;
      })

      this.loadingProvider.dismiss(loader);
    } catch (error) {
      this.loadingProvider.dismiss(loader);
      this.alertProvider
        .showAlert('profile pic upload failed.', 'profile pic update failed');
    }
  }

}
