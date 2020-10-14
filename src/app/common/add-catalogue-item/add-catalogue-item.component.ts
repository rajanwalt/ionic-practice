import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { PhotoService} from './../../APIs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { AddCatalogue } from './../../store/actions';
import { SetOrder } from './../../store/actions';
import { selectShopDetails } from './../../store/selectors';

import { Catalogue } from './../models'
import { Observable, Subscription } from 'rxjs';

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
    },
    {
      webviewPath : "",
      filePath : ""
    }
  ];

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

  isActive = 0;
  hasDimensions = false;

  catalogueForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    additionalDetails: new FormControl(''),
    delivery: new FormControl(false),
    dimension: new FormControl('small'),
    dimensionDetails: new FormGroup({
      weight : new FormControl('0.0'),
      length : new FormControl('0.0'),
      width : new FormControl('0.0'),
      height : new FormControl('0.0')
    })
  }, 
  // { validators: formValidator }
  );

  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  shopDetailsSub: Subscription;
  service_id;
   
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
    if(this.catalogueForm.valid)  {
      
      let payload = this.catalogueForm.value;


      if(this.router.url.indexOf('order') > 0 )  {
        // const {price, productName} = this.catalogueForm.value;
        // const orderDetails = [{ price, productName, count: 1}]
        // this._store.dispatch(new SetOrder({orderDetails}));
        
        this._store.dispatch(new AddCatalogue({...payload, shopId: this.service_id, from : "order" }));

        // this.router.navigate(['/order/order_summary']);
      }
      else {
        this._store.dispatch(new AddCatalogue({...payload, shopId: this.service_id }));
      }
    }
  }
  onDelete(index)  {
    let selectedPhoto = this.photos[index] 
    selectedPhoto.webviewPath && (selectedPhoto.webviewPath = "");
  }
  onSelectPhoto(index)  {
    this.presentActionSheet(index);
  }

  loadImageFromCamera(index)  {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.photoService.getPicture(options).then((imgData) => {
      this.photos[index] = imgData
    });
    
  }

  loadImageFromLib(index)  {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.photoService.getPicture(options).then((imgData) => {
      this.photos[index] = imgData
    });      
  }
  
  async presentActionSheet(index) {
    let that = this;
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Source',
      buttons: [ {
        text: 'Load from Library',
        icon: 'image',
        handler: () => {
          that.loadImageFromLib(index);
        }
      }, {
        text: 'Use Camera',
        icon: 'camera',
        handler: () => {
          that.loadImageFromCamera(index);
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
    public photoService : PhotoService,
    private activatedRoute: ActivatedRoute,
    private _store: Store<State>,
    private router: Router) { 

    }

  ngOnInit() {
    let catalogueId = this.activatedRoute.snapshot.queryParamMap.get('id');

    if(catalogueId !=  undefined)  {
      
      // Call API to retrive Data and set or patch customerForm
    }
  }

  ionViewWillEnter(){
    this.shopDetailsSub = this.shopDetails$.subscribe(data => {
      if(data)  {
        this.service_id = data['id'];
      }
    })
  }

}
