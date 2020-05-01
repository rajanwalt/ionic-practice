import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { PhotoService} from './../../APIs';

interface Photo  {
  filePath :  string,
  webviewPath : string
}

@Component({
  selector: 'app-add-catalogue-item',
  templateUrl: './add-catalogue-item.component.html',
  styleUrls: ['./add-catalogue-item.component.scss'],
})
export class AddCatalogueItemComponent implements OnInit {

  photos : Photo[] = [
    {
      webviewPath : "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
      filePath : ""
    },
    {
      webviewPath : "",
      filePath : ""
    },
    {
      webviewPath : "",
      filePath : ""
    },
    {
      webviewPath : "",
      filePath : ""
    }
  ];
  selectedImageIndex: number;

  dimensions :  Array<any> = [
    {
      type: "Small",
      logo: "basket",
      weight : 1,
      length : 30,
      width: 20,
      height: 15
    },
    {
      type: "Medium",
      logo: "briefcase",
      weight : 5,
      length : 43,
      width: 34,
      height: 17
    },
    {
      type: "Large",
      logo: "easel",
      weight : 10,
      length : 25,
      width: 35,
      height: 56
    }
  ];

  catalogueForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    additionalDetails: new FormControl(''),
    delivery: new FormControl(false),
    dimension: new FormControl(''),
    dimensionDetails: new FormGroup({
      weight : new FormControl('0.0'),
      length : new FormControl('0.0'),
      width : new FormControl('0.0'),
      height : new FormControl('0.0')
    })
  }, 
  // { validators: formValidator }
  );
   
  onSelectDimensions(type: string)  {
    this.catalogueForm.get('dimension').setValue(type);

    switch(type) {
      case "Small": {
        const {weight, length, width, height} = this.dimensions[0];
        const data = {weight, length, width, height};
        this.catalogueForm.get('dimensionDetails').setValue(data);
        break;
      }
      case "Medium": {
        const {weight, length, width, height} = this.dimensions[1];
        const data = {weight, length, width, height};
        this.catalogueForm.get('dimensionDetails').setValue(data);
        break;
      }
      default : {
        const {weight, length, width, height} = this.dimensions[2];
        const data = {weight, length, width, height};
        this.catalogueForm.get('dimensionDetails').setValue(data);
        break;
      }

    }

  }
  onSubmit()  {
    console.log(this.catalogueForm.value);
  }
  onDelete(index)  {
    let selectedPhoto = this.photos[index] 
    selectedPhoto.webviewPath && (selectedPhoto.webviewPath = "");
  }
  onSelectPhoto(index)  {
    this.selectedImageIndex = index;
  }

  loadImageFromCamera()  {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.photoService.getPicture(options).then((imgData) => {
      this.photos[this.selectedImageIndex] = imgData
    });
    
  }

  loadImageFromLib()  {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.photoService.getPicture(options).then((imgData) => {
      this.photos[this.selectedImageIndex] = imgData
    });      
  }
  
  async presentActionSheet() {
    let that = this;
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Source',
      buttons: [ {
        text: 'Load from Library',
        icon: 'image',
        handler: () => {
          that.loadImageFromLib();
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
  constructor(public actionSheetController: ActionSheetController,
    private camera: Camera,
    private file: File,
    public photoService : PhotoService,
    private webview: WebView) { 

    }

  ngOnInit() {}

}
