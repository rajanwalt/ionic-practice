import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap, filter, map, flatMap, find } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { AddCustomers, GetCustomer } from './../../store/actions';
import { selectCustomers } from 'src/app/store/selectors';
import { Customer } from '../models';


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
  countries : Array<string> = [
    "Dubai"
  ];

  cities : Array<string> = [
    "Ajman"
  ];

  onSubmit()  {
    if(this.customerForm.valid)  {
      this.customerForm.value['shopId']=1;
      this._store.dispatch(new AddCustomers(this.customerForm.value));
    }
  }
  
  constructor(private activatedRoute: ActivatedRoute, private _store: Store<State>) { }

  ngOnInit() {

    let customerId = this.activatedRoute.snapshot.queryParamMap.get('id');

    if(customerId !=  undefined)  {
      // this._store.dispatch(new GetCustomer({'this.customerForm.value'}));
      this._store.select(selectCustomers).pipe(
        flatMap(customers =>{ 
          console.log(customers)
          return customers.filter( entry => customerId == entry.id)
        }
          )
      ).subscribe(customer => {
        // Object.keys(customer[0]).forEach(key =>{
        //   if(this.customerForm.value )
        //   this.customerForm.value[key] = customer[0][key]
        // }
        console.log(customer)
        this.customerForm.patchValue(customer)
        });
        
      
       
    }

  }

}
