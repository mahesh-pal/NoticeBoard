import { Injectable } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

@Injectable()
export class UtilProvider {
  constructor(private actionSheetCtrl: ActionSheetController,
    private camera: Camera) {
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

}
