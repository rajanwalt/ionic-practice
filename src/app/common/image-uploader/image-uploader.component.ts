import { Component, OnInit, Input } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  // @Input() public isActive : boolean = false;
  public inputImage : any;
  croppedImage : any = null;

  constructor(
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private file: File) { }


  readFile(file: any) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgBlob = new Blob([reader.result], {
          type: file.type
        });
        
      };
      reader.readAsArrayBuffer(file);
  }

  convertFileToDataURL(url: string) : Observable<any>  {
    return Observable.create(observer => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onload = function()  {
        let reader: FileReader = new FileReader();
        reader.onloadend = function()  {
          observer.next(reader.result);
          observer.complete();
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    })
  }

  onCropImage(event: ImageCroppedEvent)  {
    this.croppedImage = event.base64;
  }
  
  getPicture(options)  {
    this.camera.getPicture(options).then((imageData) => {
      this.inputImage = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }

  loadImageFromCamera()  {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.getPicture(options);
    
  }

  loadImageFromLib()  {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.getPicture(options);

  }

  loadFromAsset()  {
    this.convertFileToDataURL(`assets/images/test-logo.jpg`).subscribe( imgBase64 => {
      this.inputImage = imgBase64;
    })
  }

  async presentActionSheet() {
    let that = this;
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Source',
      buttons: [ {
        text: 'Load from Library',
        icon: 'image',
        handler: () => {
          that.loadFromAsset();
        }
      }, {
        text: 'Use Camera',
        icon: 'camera',
        handler: () => {
          that.loadImageFromCamera();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  onCrop()  { }

  onRotate()  {}

  ngOnInit() {
    this.presentActionSheet();
  }

}
