import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateAccount } from './../../store/actions';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { showValidationMsg } from './../../common/form-validator';

import { throwError } from 'rxjs';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss'],
})
export class KycComponent implements OnInit {

  @Input() payload : any = null;
  
  createAccountForm = new FormGroup({});
  minDate: string = new Date().toISOString();
  maxData : any = (new Date()).getFullYear() + 40;

  freelancerFrom = new FormGroup({
    IDProofIssuedDate: new FormControl('', Validators.required),
    IDProofExpiryDate: new FormControl('', Validators.required),
    IDENTITY_PROOF: new FormControl('', Validators.required)
  });

  legalEntityFrom = new FormGroup({
    RegistrationIssuedDate: new FormControl('', Validators.required),
    RegistrationExpiryDate: new FormControl('', Validators.required),
    IDENTITY_PROOF: new FormControl('', Validators.required),
    REGISTRATION_PROOF: new FormControl('', Validators.required),
    ARTICLES_OF_ASSOCIATION: new FormControl('', Validators.required),
  });

  onDismiss()  {
    this.modalController.dismiss(this.payload);
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

  getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
  }

  readFileAsBlob(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let reader: FileReader = this.getFileReader();
      reader.onloadend = () => {
        // const imgBlob = new Blob([reader.result], { type: 'image/jpeg' });
        // resolve(imgBlob);
        
        var base64data = reader.result;   
        resolve(base64data);
      };

      reader.onerror = (e) => {
        console.log('Failed file read: ' + e.toString());
        reject(e);
      };
      // reader.readAsArrayBuffer(file);
      reader.readAsDataURL(file); 
    })  
  }

  async onFileChange(event, type)  {
    try {
      if (event.target.files.length > 0) {
        const name = event.target.name;
        const file = event.target.files[0];
        const blob = await this.readFileAsBlob(file);
        
        this.createAccountForm.get(type).patchValue({
          [name]: blob
        });
      }
    } catch(e)  {
      throwError(e)
    }
    
  }

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
      let finalPayload = {};
      let formData = new FormData();

      if(this.payload && this.payload.hasOwnProperty('legalEntity'))  {
        finalPayload =  {...this.payload['legalEntity'], ...this.createAccountForm.get('legalEntity').value}
      }
      else {
        finalPayload =  {...this.payload['freelancer'], ...this.createAccountForm.get('freelancer').value}
      }

      finalPayload['vendorType'] = this.payload['vendorType'];

      for(const property in finalPayload)  {
        formData.append(property, finalPayload[property]);
      }

      console.log("formData", formData);
      // this._store.dispatch(new CreateAccount(formData));
      this._store.dispatch(new CreateAccount(finalPayload));
    }
    else { 
      showValidationMsg(this.createAccountForm)
      this.presentToast();
    }
  }

  constructor(private modalController: ModalController, private _store: Store<State>, public toastController: ToastController) { }

  ngOnInit() {
    if(this.payload && this.payload.hasOwnProperty('legalEntity'))  {
      this.createAccountForm.addControl('legalEntity', this.legalEntityFrom);
    }
    else {
      this.createAccountForm.addControl('freelancer', this.freelancerFrom);
    }
  }

}
