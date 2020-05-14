import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss'],
})
export class ViewCustomerComponent implements OnInit {

  customerDetails$ = of({
    firstName: "Rajan",
    lastName: "Joseph",
    email: "rajanwalt@gmail.com",
    phoneNumber: "+91 9698446776",
    country: "Dubai",
    city: "yyyy",
    street: "yyyuyuyi,yuyuy",
    joinedOn: "Sun May 10 2020 12:52:11 GMT+0530",
    totalOrders : 10,
    totalSpent : 1000
  });

  onEdit()  {
    this.router.navigate(['/shop/add_customer',  'edit' ]);
  }

  constructor(private router: Router) { }

  ngOnInit() {}

}
