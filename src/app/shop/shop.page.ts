import { Component, OnInit, ElementRef, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router} from '@angular/router'

import {Geolocation} from '@ionic-native/geolocation/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';


import { Store } from '@ngrx/store';
import { SetShopAddress } from './../store/actions'
import { selectShopDetails } from './../store/selectors';
import { State } from './../store/reducers';
import { Observable, Subscription, of } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';

import {MonekatService} from './../APIs/monekat.service';

const formValidator: ValidatorFn =(control: FormGroup): ValidationErrors | null => {
  const name = control.get('name');
  const alterEgo = control.get('alterEgo');

  return name && alterEgo && name.value === alterEgo.value ? { 'identityRevealed': true } : null;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit, OnDestroy {

  @ViewChild('Map', {static: true}) public mapElement: ElementRef;

  location = { lat : 12.975971, lng : 80.22120919999998};
  

  fileUrl: any = null;
  
  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  shopDetailsSub : Subscription;
  shopProfileForm = new FormGroup({
    shopName: new FormControl('', Validators.required),
    email: new FormControl(''),
    website: new FormControl(''),
    shopdetails: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl('')
  }, 
  // { validators: formValidator }
);
  shopAddress : string = ""; //data:image/jpeg;base64,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
  hasShopAddress : boolean = false;
  shopLogo: string = "";
  geoLocation$: Observable<any> = this.shopDetails$.pipe(switchMap((detail) => {
    if(detail['street'] && detail['city'] &&  detail['country'])  {
      return this.service.getGoogleLatLng(detail['street']+","+detail['city']+","+detail['country']).pipe(
        map(val => val),
        catchError(error => of({ lat : 12.975971, lng : 80.22120919999998}))
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
              private service: MonekatService) { 
  }

  ngOnInit() {
    this.shopDetailsSub = this.shopDetails$.subscribe( shopDetails => {
      this.shopProfileForm.setValue(shopDetails);
      this.hasShopAddress = (shopDetails['country'] && shopDetails['country'].length>0) ? true : false;
      this.shopAddress = shopDetails['street'] + "," + shopDetails['city'] + "," + shopDetails['country'];
    })

  }
  
  onSubmit()  {

  }
  
  goToAddress()  {
    this._store.dispatch(new SetShopAddress(this.shopProfileForm.value))
    this.router.navigate(['/shop/shop-address']);
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      
      const formData = new FormData();
      formData.append('file', imgBlob, file.name);
      
      // this.shopProfileForm.addControl('file', imgBlob, file.name);
      
      // this.uploadService.uploadFile(formData).subscribe(dataRes => {
      //   console.log(dataRes);
      // });
    };
    reader.readAsArrayBuffer(file);
  }

  getPicture(options)  {
    this.camera.getPicture(options).then((imageData) => {
      this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
        entry.file(file =>  {
          console.log("File", file);
          this.readFile(file);
        })
      })
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
