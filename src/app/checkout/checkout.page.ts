import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  activeTab : number = 0;

  tabs : string[] = [
    "delivery",
    "payment",
    "review"
  ];

  constructor() { }

  ngOnInit() {
  }

}
