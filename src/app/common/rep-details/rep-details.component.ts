import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { counries, cities } from './../countries_cities';
import { KycComponent } from './../kyc/kyc.component';
import { showValidationMsg } from './../../common/form-validator';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { selectCreateAccount} from './../../store/selectors';
import { SetCreateAccount } from './../../store/actions';

@Component({
  selector: 'app-rep-details',
  templateUrl: './rep-details.component.html',
  styleUrls: ['./rep-details.component.scss'],
})
export class RepDetailsComponent implements OnInit {
  payload = {}
  createAccount$ : Observable<any> = this._store.select(selectCreateAccount)
  createAccountSub : Subscription;
  
  createAccountForm = new FormGroup({
    LegalRepresentativeFirstName: new FormControl('', Validators.required),
    LegalRepresentativeLastName: new FormControl('', Validators.required),
    LegalRepresentativeEmail: new FormControl('', Validators.required),
    // vendorType: new FormControl('', Validators.required),
    LegalRepresentativeBirthday: new FormControl('', Validators.required),
    LegalRepresentativeAddress : new FormGroup({
      City :  new FormControl(''),
      Country :  new FormControl(''),
      PostalCode :  new FormControl(''),
      AddressLine1 :  new FormControl('')
    })
  });

  countries : Array<string> = counries()

  cities : Array<any> = [];

  onChangeCountry(event)  {
    let country = event.detail.value;
    this.cities = cities(country) || [];
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.createAccountForm.get('LegalRepresentativeBirthday').setValue(date, {
       onlyself: true
    })
  }

  onDismiss()  {
    // this.modalController.dismiss(this.payload);
    let finalPayload = {};
    this.payload['vendorType'] && (finalPayload['vendorType'] = this.payload['vendorType']);

    if(this.payload && this.payload.hasOwnProperty('legalEntity'))  { 
      finalPayload['legalEntity'] = {...this.payload['legalEntity'], ...this.createAccountForm.value}
      this._store.dispatch(new SetCreateAccount(finalPayload));
    }

    this.navCtrl.navigateBack('/create-account');
  }

  
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Please fill in all the required fields",
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
  }

  async onSubmit()  {
    if(this.createAccountForm.valid)  {
      let formData = { ...this.payload }
      formData['legalEntity'] = {...formData['legalEntity'], ...this.createAccountForm.value}
      
      // const modal = await this.modalController.create({
      //   component: KycComponent,
      //   componentProps : {
      //     "payload" : formData
      //   }
      // });
      
      // await modal.present();
  
      // const { data } = await modal.onWillDismiss();
      
      this._store.dispatch(new SetCreateAccount(formData));
      this.navCtrl.navigateForward('/kyc')
      
      // this.createAccountForm.patchValue(data);
    }
    else { 
      showValidationMsg(this.createAccountForm);
      this.presentToast();
    }

  }


  constructor(public modalController: ModalController, 
              public toastController: ToastController, 
              private _store: Store<State>,
              private navCtrl: NavController ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.createAccountSub = this.createAccount$.subscribe(payload => {
      if(payload)  {
        this.payload = payload;
        if(payload['legalEntity']) {
          this.createAccountForm.patchValue(payload['legalEntity']);
        }
        else {
          console.log("no data in the payload")
          
          this.navCtrl.navigateBack('/create-account')
        }
      }
     
    })
  }

  ionViewWillLeave(){
    if(this.createAccountSub)  {
      this.createAccountSub.unsubscribe()
    }
  }
  

}
