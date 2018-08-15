import { ActionSheetController } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage'
import { Camera } from '@ionic-native/camera';
import { Injectable } from '@angular/core';
import { User } from 'firebase';
@Injectable()
export class UtilProvider {
  constructor(private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private afs: AngularFireStorage) {
  }
  createImageUploadActionSheet(onSelection) {
    return this.actionSheetCtrl.create({
      title: 'Profile photo',
      buttons: [
        {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            onSelection(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            onSelection(this.camera.PictureSourceType.CAMERA)
          }
        }
      ]
    });
  }

  uploadImageToFirebase(path: string, picData: string) {
    return this.afs.ref(path).putString(picData, 'data_url');
  }
  getDownloadUrl(path: string) {
    return this.afs.ref(path).getDownloadURL();
  }

  updateProfilePhoto(user: User, url: string) {
    return user.updateProfile({
      displayName: user.displayName,
      photoURL: url
    });
  }

}
