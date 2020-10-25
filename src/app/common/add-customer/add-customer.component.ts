import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { switchMap, filter, map, flatMap, find } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { AddCustomers, GetCustomer } from './../../store/actions';
import { selectCustomers, selectShopDetails } from './../../store/selectors';
import { Customer } from '../models';

import { counries, cities } from './../countries_cities';

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
  
  private customer : Customer; 
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
      this._store.dispatch(new AddCustomers({...this.customerForm.value, shopId: this.serviceId}));
    }
  }
  
  constructor(private activatedRoute: ActivatedRoute, private _store: Store<State>) { }

  ngOnInit() {

    let customerId = this.activatedRoute.snapshot.queryParamMap.get('id');

    if(customerId !=  undefined)  {
      // this._store.dispatch(new GetCustomer({'this.customerForm.value'}));
      this.customerSub = this._store.select(selectCustomers).pipe(
        flatMap(customers => customers.filter( entry => customerId == entry.id))
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
