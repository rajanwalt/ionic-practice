import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { AddCustomers } from './../../store/actions';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {

  customerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl(''),
    phoneNumber: new FormControl('', Validators.required),
    country: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl('')
  });

  countries : Array<string> = [
    "Dubai"
  ];

  cities : Array<string> = [
    "Ajman"
  ];

  onSubmit()  {
    if(this.customerForm.valid)  {
      this._store.dispatch(new AddCustomers(this.customerForm.value));
    }
  }
  
  constructor(private activatedRoute: ActivatedRoute, private _store: Store<State>) { }

  ngOnInit() {

    let type = this.activatedRoute.snapshot.queryParamMap.get('id');

    if(type !=  undefined)  {
      // Call API to retrive Data and set or patch customerForm
    }

  }

}
