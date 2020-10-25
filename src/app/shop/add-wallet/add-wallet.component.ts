import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { counries } from './../../common/countries_cities';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.scss'],
})
export class AddWalletComponent implements OnInit {

  countries : Array<string> = counries()

  walletForm = new FormGroup({
    country: new FormControl('', Validators.required),
    swift: new FormControl('', Validators.required),
    iban: new FormControl('', Validators.required),
    bankName: new FormControl('', Validators.required),
    accountName: new FormControl('', Validators.required),
    accountNumber: new FormControl('', Validators.required),
  });

  onSubmit()  {
    if(this.walletForm.valid)  {

    }
  }
  
  constructor() { }

  ngOnInit() {}

}
