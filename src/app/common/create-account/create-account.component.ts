import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { counries, cities } from './../countries_cities';

import { CreateAccount, ResetCreateAccount, SetCreateAccount } from './../../store/actions';
import { selectCreateAccount} from './../../store/selectors';

import { showValidationMsg } from './../../common/form-validator';

import { RepDetailsComponent } from './../rep-details/rep-details.component';
import { KycComponent } from './../kyc/kyc.component';
import { Observable, Subscription } from 'rxjs';

enum BUSINESSTYPES {
  LEGAL_BUSINESS = "Legal Business",
  LEGAL_ORGANIZATION = "Legal Organization",
  LEAGAL_SOLETRADER = "Legal Soletrader",
  FREELANCER = "Freelancer"
}

enum VENDORTYPES {
  FREELANCER = "Freelancer",
  LEGALENTITY = "Legal Entity"
}

enum LEGALENTITYTYPES {
  // BUSINESS_ORGANIZATION_SOLETRADER = "Business/Organization/Soletrader",
  BUSINESS = "Business",
  ORGANIZATION = "Organization",
  SOLETRADER = "Soletrader"
}

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {

  // createAccountForm = new FormGroup({
  //   firstname: new FormControl('', Validators.required),
  //   lastname: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required),
  //   vendorType: new FormControl('', Validators.required),
  // });

  payload = {}
  createAccount$ : Observable<any> = this._store.select(selectCreateAccount)
  createAccountSub : Subscription;

  createAccountForm = new FormGroup({
    vendorType: new FormControl('', Validators.required)
  });

  freelancerFrom = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Birthday: new FormControl('', Validators.required),
    // Nationality: new FormControl('', Validators.required),
    CountryOfResidence: new FormControl('', Validators.required),
    Occupation: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    Address : new FormGroup({
      City :  new FormControl(''),
      Country :  new FormControl(''),
      PostalCode :  new FormControl(''),
      AddressLine1 :  new FormControl('')
    })
  });

  legalEntityFrom = new FormGroup({
    type : new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    CompanyNumber: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    HeadquartersAddress : new FormGroup({
      City :  new FormControl(''),
      Country :  new FormControl(''),
      PostalCode :  new FormControl(''),
      AddressLine1 :  new FormControl('')
    })
  });

  public businessTypes = BUSINESSTYPES;
  vendorTypes = VENDORTYPES;
  legalEntityTypes = LEGALENTITYTYPES;

  isChecked = false;
  countries : Array<string> = counries()

  cities : Array<any> = [];

  onChangeVendorType(event)  {
    let selectedBusinessType = event.detail.value;

    switch(selectedBusinessType)  {
      case BUSINESSTYPES.FREELANCER: {
        this.createAccountForm.contains('legalEntity') && this.createAccountForm.removeControl('legalEntity');
        this.createAccountForm.addControl('freelancer', this.freelancerFrom);
        break;
      }
      default: {
        this.createAccountForm.contains('freelancer') &&  this.createAccountForm.removeControl('freelancer');
        this.createAccountForm.addControl('legalEntity', this.legalEntityFrom);
        break;
      }
    }

    if(selectedBusinessType != this.payload['vendorType'])  {
      this._store.dispatch(new ResetCreateAccount(this.createAccountForm.value))
    }

  }

  onChangeCountry(event)  {
    let country = event.detail.value;
    this.cities = cities(country) || [];
  }

  // onSubmit()  {
  //   if(this.createAccountForm.valid)  {
  //     this._store.dispatch(new CreateAccount(this.createAccountForm.value));
  //   }
  //   else { 
  //     showValidationMsg(this.createAccountForm)
  //   }
  // }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Please fill in all the required fields",
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
  }


  onSubmit()  {

    if(this.createAccountForm.valid)  {
        
      // let modal = await this.modalController.create({
      //     component: (this.createAccountForm.get('vendorType').value == this.vendorTypes.LEGALENTITY ) ? RepDetailsComponent : KycComponent,
      //     componentProps : {
      //       "payload" : this.createAccountForm.value
      //     }
      // });
        
      // await modal.present();
    
      // const { data } = await modal.onWillDismiss();
      // data && this.createAccountForm.patchValue(data);

      let finalPayload = {};

      this.payload['vendorType'] && (finalPayload['vendorType'] = this.payload['vendorType']);
      
      if(this.payload.hasOwnProperty('legalEntity'))  {
        finalPayload['legalEntity'] =  {...this.payload['legalEntity'], ...this.createAccountForm.get('legalEntity').value}

        this._store.dispatch(new SetCreateAccount(finalPayload));
      }
      else if(this.payload.hasOwnProperty('freelancer')) {
        finalPayload['freelancer'] =  {...this.payload['freelancer'], ...this.createAccountForm.get('freelancer').value}
        
        this._store.dispatch(new SetCreateAccount(finalPayload));
      }
      else {
        this._store.dispatch(new SetCreateAccount(this.createAccountForm.value));
      }

      (this.createAccountForm.get('vendorType').value == this.vendorTypes.LEGALENTITY ) ? this.navCtrl.navigateForward('/representative-details') : this.navCtrl.navigateForward('/kyc');

      
    }
    else { 
      showValidationMsg(this.createAccountForm)
      this.presentToast()
    }

  }

  goBack()  {
    this.navCtrl.back();
  }

  checkTandC()  {
    this.isChecked = !this.isChecked;
  }

  onChangeLegalEntityType(event)  {

  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    let name = e.target.name;


    if(this.createAccountForm.value.hasOwnProperty('legalEntity'))  {
      this.createAccountForm.get('legalEntity').get(name).setValue(date, {
        onlyself: true
     })
    }
    else {
      this.createAccountForm.get('freelancer').get(name).setValue(date, {
        onlyself: true
     })
    }
  }

  constructor(private navCtrl: NavController, 
              private _store: Store<State>, 
              private modalController: ModalController,
              public toastController: ToastController ) { }


  ngOnInit() {}

  ionViewWillEnter() {
    this.createAccountSub = this.createAccount$.subscribe(payload => {
      this.payload = payload;

      if(payload)  {
        if(payload.hasOwnProperty('legalEntity'))  {
          this.createAccountForm.addControl('legalEntity', this.legalEntityFrom);
        }
        else if(payload.hasOwnProperty('freelancer')) {
          this.createAccountForm.addControl('freelancer', this.freelancerFrom);
        }
        else {
          console.log("no data in the payload");
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
