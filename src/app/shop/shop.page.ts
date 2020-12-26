import { Component, OnInit, ElementRef, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

import {Geolocation} from '@ionic-native/geolocation/ngx';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


import { Store } from '@ngrx/store';
import { SetShop, PostShop, GetFile, PostFile, UpdateShop } from './../store/actions';
import { selectShopDetails, selectUser } from './../store/selectors';
import { State } from './../store/state';
import { Observable, Subscription } from 'rxjs';

import { PhotoService} from './../APIs';
import { ShopAddressComponent } from './shop-address/shop-address.component';
import { hostName } from './../common/hostname';

import { showValidationMsg } from './../common/form-validator';

// const formValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
//   const shopName = control.get('name');
//   const alterEgo = control.get('alterEgo');

//   return name && alterEgo && name.shopName === alterEgo.value ? { 'identityRevealed': true } : null;
// }

interface Photo  {
  imgBlob :  Blob,
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
  hostName = hostName;
    
  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  serviceId = '';

  user$: Observable<any> = this._store.select(selectUser)
  shopDetailsSub : Subscription;
  userSub: Subscription;
  userId: any;

  public shopProfileForm = new FormGroup({
    shopName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    // website: new FormControl('', Validators.required),
    // shopdetails: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    postalcode: new FormControl(""),
    currencyCode : new FormControl(''),
    refundPolicy: new FormControl(''),
  }, 
  // { validators: formValidator }
  );
  
  shopAddress : string = ""; 
  hasShopAddress : boolean = false;
  
  shopLogo = null;

  // geoLocation$: Observable<any> = this.shopDetails$.pipe(switchMap((detail) => {
  //   if(detail['street'] && detail['city'] &&  detail['country'])  {
  //     return this.service.getGoogleLatLng(detail['street']+","+detail['city']+","+detail['country']).pipe(
  //       map(val => this.location),
  //       catchError(error => of(this.location))
  //     )
  //   }
  //   return of({ lat : 12.975971, lng : 80.22120919999998});
  // }));

  constructor(public geolocation: Geolocation, 
              private _store: Store<State>,
              public actionSheetController: ActionSheetController,
              private camera: Camera,
              public photoService : PhotoService,
              private modalController: ModalController) { 
  }
  
  async onSubmit()  {
    if(this.shopProfileForm.valid)  {

      let shopPayload = {
        ...this.shopProfileForm.value, 
        userId: this.userId,
        ... this.serviceId ? { id : this.serviceId } : {}
      };

      let shopLogoBlog: Blob = this.shopLogo && this.shopLogo.imgBlob ?  this.shopLogo.imgBlob : null;
      if(this.serviceId)  {
        this._store.dispatch(new UpdateShop({shopPayload, shopLogoBlog}))
      }
      else {
        this._store.dispatch(new PostShop({shopPayload, shopLogoBlog}))
      }
    }
    else {
      showValidationMsg(this.shopProfileForm)
    }
  }
  
  async goToAddress()  {
    
    const modal = await this.modalController.create({
      component: ShopAddressComponent,
      componentProps : {
        "shopDetails" : this.shopProfileForm.value
      },
      cssClass: 'payment-modal-custom-class',
      
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    data && this.shopProfileForm.patchValue(data);
    
  }

  

  loadImageFromCamera()  {
    this.photoService.getPicture('CAMERA').then((imgData) => {
      this.shopLogo = imgData
    });
  }

  loadImageFromLib()  {
    this.photoService.getPicture('PHOTOLIBRARY').then((imgData) => {
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

  ngOnInit() {

    
  }

  ionViewDidEnter()  {
    this.shopDetailsSub = this.shopDetails$.subscribe( shopDetails => {
      if(shopDetails)  {
        this.shopProfileForm.patchValue(shopDetails);
        this.serviceId = shopDetails['id'];

        if(shopDetails['images'] && shopDetails['images'].length)  {
          let filename = shopDetails['images'][shopDetails['images'].length - 1]['filename'];

          let webviewPath = `${hostName}/api/services/downloadfile/${filename}`
          this.shopLogo = {
            webviewPath
          }
          
        }
      }
    });

    this.userSub = this.user$.subscribe( data => data && (this.userId = data['id']))
    
  }

  ngOnDestroy(): void {
    if(this.shopDetailsSub)  {
      this.shopDetailsSub.unsubscribe();
    }
  }
  
}
