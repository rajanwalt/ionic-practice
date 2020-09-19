import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RouterStateService } from './../common';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

    
  tabs : string[] = [
    "delivery",
    "payment",
    "review"
  ];

  activeTabLink : string = "delivery";

  
  goToNextTab()  {
    //1. Validate current tab values 2. If valid, navigate to next Tab 3. 
  }

  onActivateTab(activeTab : string)  {
    this.activeTabLink = activeTab;

    this.router.navigate([`/checkout/${activeTab}`])
  }

  getActiveTabLinkFromURL(url)  {
    return url ? url.replace('/checkout/', '') : '';
  }

  constructor(private router: Router, 
              private activatedRoute : ActivatedRoute, 
              private routerStateService: RouterStateService) { 
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    let currentURL = this.router.url;

    this.activeTabLink = this.getActiveTabLinkFromURL(currentURL);
   
  }

 
}
