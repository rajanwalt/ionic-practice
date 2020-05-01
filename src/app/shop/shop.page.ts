import { Component, OnInit, ElementRef, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router} from '@angular/router'

import {Geolocation} from '@ionic-native/geolocation/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


import { Store } from '@ngrx/store';
import { SetShopAddress } from './../store/actions'
import { selectShopDetails } from './../store/selectors';
import { State } from './../store/reducers';
import { Observable, Subscription, of } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';

import {MonekatService, PhotoService} from './../APIs';

// const formValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
//   const shopName = control.get('name');
//   const alterEgo = control.get('alterEgo');

//   return name && alterEgo && name.shopName === alterEgo.value ? { 'identityRevealed': true } : null;
// }

interface Photo  {
  filePath :  string,
  webviewPath : string
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit, OnDestroy {

  @ViewChild('Map', {static: true}) public mapElement: ElementRef;

  location = { lat : 12.975971, lng : 80.22120919999998};
  
  overlayHidden : boolean = true;
  fileUrl: any = null;
  
  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  shopDetailsSub : Subscription;
  shopProfileForm = new FormGroup({
    shopName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    shopdetails: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl('')
  }, 
  // { validators: formValidator }
);
  shopAddress : string = ""; 
  hasShopAddress : boolean = false;
  shopLogo: Photo = {
    filePath : '',
    webviewPath: ''
  }

  geoLocation$: Observable<any> = this.shopDetails$.pipe(switchMap((detail) => {
    if(detail['street'] && detail['city'] &&  detail['country'])  {
      return this.service.getGoogleLatLng(detail['street']+","+detail['city']+","+detail['country']).pipe(
        map(val => this.location),
        catchError(error => of(this.location))
      )
    }
    return of({ lat : 12.975971, lng : 80.22120919999998});
  }));


  constructor(public geolocation: Geolocation, 
              private router: Router,
              private _store: Store<State>,
              public actionSheetController: ActionSheetController,
              private camera: Camera,
              private file: File,
              private service: MonekatService,
              public photoService : PhotoService,
              private webview: WebView) { 
  }

  ngOnInit() {
    this.shopDetailsSub = this.shopDetails$.subscribe( shopDetails => {
      this.shopProfileForm.setValue(shopDetails);
      this.hasShopAddress = (shopDetails['country'] && shopDetails['country'].length>0) ? true : false;
      this.shopAddress = shopDetails['street'] + "," + shopDetails['city'] + "," + shopDetails['country'];
    })

  }
  
  async onSubmit()  {
    const formData = new FormData();
    if(this.shopProfileForm.valid)  {
      formData.append("shopName", this.shopProfileForm.get('shopName').value);
      formData.append("email", this.shopProfileForm.get('email').value);
      formData.append("website", this.shopProfileForm.get('website').value);
      formData.append("shopdetails", this.shopProfileForm.get('shopdetails').value);
      formData.append("country", this.shopProfileForm.get('country').value);
      formData.append("city", this.shopProfileForm.get('city').value);
      formData.append("street", this.shopProfileForm.get('street').value);
      const shopLogoBlog: Blob = this.shopLogo.filePath ? await this.photoService.convertImageUriToBlob(this.shopLogo.filePath) : null;
      formData.append("shopLogo", shopLogoBlog, "logo");
    }
  }
  
  goToAddress()  {
    this._store.dispatch(new SetShopAddress(this.shopProfileForm.value))
    this.router.navigate(['/shop/shop-address']);
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
      this.shopLogo = imgData
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
      this.shopLogo = imgData
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

  ngOnDestroy(): void {
    this.shopDetailsSub.unsubscribe();
  }
  
}
