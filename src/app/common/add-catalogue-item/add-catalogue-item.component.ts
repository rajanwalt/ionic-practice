import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { PhotoService} from './../../APIs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { AddCatalogue, PutCatalogue } from './../../store/actions';
import { SetOrder } from './../../store/actions';
import { selectCatalogue, selectShopDetails, selectCurrency} from './../../store/selectors';

import { Catalogue } from './../models'
import { Observable, Subscription } from 'rxjs';

import { hostName } from './../../common/hostname';
import { showValidationMsg } from './../../common/form-validator';
import { TranslateService } from '@ngx-translate/core'; 

interface Photo  {
  imgBlob :  Blob,
  webviewPath : string
}

@Component({
  selector: 'app-add-catalogue-item',
  templateUrl: './add-catalogue-item.component.html',
  styleUrls: ['./add-catalogue-item.component.scss'],
})
export class AddCatalogueItemComponent implements OnInit {

  hostName = hostName;
  catalogueId;
  photos : Photo[] = [
    null,
    null,
    null,
    null
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
  currency$ = this._store.select(selectCurrency);
  
  catalogueForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    additionalDetails: new FormControl(''),
    delivery: new FormControl(false),
    dimension: new FormControl('Small'),
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
  public catelogue$ : Observable<any> = this._store.select(selectCatalogue);

  shopDetailsSub: Subscription;
  catalogueSub: Subscription;
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
      
      let itemDetails = {
        ...this.catalogueForm.value, 
        shopId: this.service_id, 
        ... (this.router.url.indexOf('order') > 0 ) ? {from : "order"} : {} 
      };

      let itemImages = this.photos.filter( data => data && data['imgBlob']).map(data => data.imgBlob);

      if(this.catalogueId)  {
        let itemDetailsWithId = {...itemDetails, id : this.catalogueId};

        this._store.dispatch(new PutCatalogue({ 
          itemDetails : itemDetailsWithId,  
          itemImages
        }));
      }
      else {
        this._store.dispatch(new AddCatalogue({ itemDetails ,  itemImages}));
      }

      /*
      if(this.router.url.indexOf('order') > 0 )  {
        // const {price, productName} = this.catalogueForm.value;
        // const orderDetails = [{ price, productName, count: 1}]
        // this._store.dispatch(new SetOrder({orderDetails}));

        
        this._store.dispatch(new AddCatalogue({...payload,  from : "order" , itemImages}));

        // this.router.navigate(['/order/order_summary']);
      }
      else {
        this._store.dispatch(new AddCatalogue({...payload,  itemImages}));
      }*/
    }
    else { 
      showValidationMsg(this.catalogueForm)
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

    this.photoService.getPicture('CAMERA').then((imgData) => {
      this.photos[index] = imgData
    });
    
  }

  loadImageFromLib(index)  {

    this.photoService.getPicture('PHOTOLIBRARY').then((imgData) => {
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

  getTranslate(input)  {
    return input ? this.translate.instant(`catalogue.addItem.label.${input}`) : ""
  }

  constructor(public actionSheetController: ActionSheetController,
    private camera: Camera,
    public photoService : PhotoService,
    private activatedRoute: ActivatedRoute,
    private _store: Store<State>,
    private router: Router,
    private translate: TranslateService) { 

    }

  ngOnInit()  {}

  ionViewDidEnter() {
    this.catalogueId = this.activatedRoute.snapshot.queryParamMap.get('id') ? this.activatedRoute.snapshot.queryParamMap.get('id') : ''

    if(this.catalogueId)  {
      this.catalogueSub = this.catelogue$.subscribe(catalogueItems => {
        let [catalogue] = catalogueItems.filter(data => data['id'] == this.catalogueId);

        if(catalogue)  {
          this.catalogueForm.patchValue(catalogue);
          if(catalogue['images'] && catalogue['images'].length)  {
            let images = [...catalogue['images']].sort(function(a,b) {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            });
            
            images.filter((data, index) => index < 4).map((data, index) => {

              let filename = data['filename'];
              let webviewPath = `${hostName}/api/services/downloadfile/${filename}`
              this.photos[index] = {
                webviewPath,
                imgBlob : null
              }
            })
          }
        }
      })
      
    }
  }

  ionViewWillEnter(){
    this.shopDetailsSub = this.shopDetails$.subscribe(data => {
      if(data)  {
        this.service_id = data['id'];
      }
    })
  }

  ionViewDidLeave(){
   if(this.catalogueSub)  {
     this.catalogueSub.unsubscribe();
   }
  }

}
