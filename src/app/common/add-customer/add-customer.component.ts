import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { switchMap, filter, map, flatMap, find } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { AddCustomers, GetCustomer, PutCustomer } from './../../store/actions';
import { selectCustomers, selectShopDetails } from './../../store/selectors';
import { Customer } from '../models';

import { counries, cities } from './../countries_cities';
import { showValidationMsg } from './../../common/form-validator';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {

  customerForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required)
  });
  
  private customerId : any; 
  private serviceId = '';

  countries : Array<string> = counries()

  cities : Array<any> = [];

  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  shopDetailsSub: Subscription;
  customerSub : Subscription;

  onChangeCountry(event)  {
    let country = event.detail.value;
    this.cities = cities(country) || [];
  }

  onSubmit()  {
    if(this.customerForm.valid)  {
      if(this.customerId)  {
        this._store.dispatch(new PutCustomer({...this.customerForm.value, shopId: this.serviceId, id: this.customerId}));
      }
      else {
        this._store.dispatch(new AddCustomers({...this.customerForm.value, shopId: this.serviceId}));
      }
    }
    else { 
      showValidationMsg(this.customerForm)
    }
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    let name = e.target.name;

    this.customerForm.get(name).setValue(date, {
      onlyself: true
    })
 
  }
  
  constructor(private activatedRoute: ActivatedRoute, private _store: Store<State>) { }

  ngOnInit() {

    this.customerId = this.activatedRoute.snapshot.queryParamMap.get('id');

    if(this.customerId !=  undefined)  {
      // this._store.dispatch(new GetCustomer({'this.customerForm.value'}));
      this.customerSub = this._store.select(selectCustomers).pipe(
        flatMap(customers => customers.filter( entry => this.customerId == entry.id))
      ).subscribe(customer => {

        if(customer && customer.country)  {
          this.cities = cities(customer.country) || [];
        }

        this.customerForm.patchValue(customer);

        });
       
    }

  }

  ionViewWillEnter(){
    this.shopDetailsSub = this.shopDetails$.subscribe(data => {
      if(data)  {
        this.serviceId = data['id'];
      }
    })

    if(this.customerSub)  {
      this.customerSub.unsubscribe();
    }

  }

}
