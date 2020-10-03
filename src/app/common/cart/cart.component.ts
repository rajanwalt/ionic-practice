import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OrderDetailsModel } from './../models';

import * as _ from 'underscore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  @Input() orderDetails : OrderDetailsModel[] = [];

  public updatedOrders : OrderDetailsModel[]; 
  
  public subTotal;

  calculateTotal()  {
    
    if(this.updatedOrders.length > 1)  {
      this.subTotal = this.updatedOrders.reduce((accumulator, currentValue) => accumulator + (+currentValue.price * currentValue.count), 0 );
    }
    else if(this.updatedOrders.length == 1) {
      this.subTotal = +this.updatedOrders[0]['price'] * this.updatedOrders[0]['count'];
    }
    else {
      this.subTotal = 0;
    }
  
  }
   
  getCounterValue(orderDetails: OrderDetailsModel)  {
    let {item_id, count} = orderDetails;

    
    let isOrderExit = _.findIndex(this.updatedOrders, {item_id});
    
    
    if(isOrderExit >= 0)  {
        if(count > 0)  {
          this.updatedOrders[isOrderExit] = {...orderDetails};
        }
        else {
          this.updatedOrders.splice(isOrderExit, 1);
          
          // this.orders.orderDetails = [...this.updatedOrders]
        }
    }
    else {
      this.updatedOrders.push(orderDetails);
    }


    this.calculateTotal()

  }


  onDismiss()  {
    this.modalController.dismiss(this.orderDetails);
  }

  onSave()  {
    this.modalController.dismiss(this.updatedOrders);
  }


  ngOnInit() {
    this.updatedOrders = JSON.parse(JSON.stringify(this.orderDetails));
    // this.updatedOrders = [ { "item_id": 1, "productName": "testItem", "count": 1, "price": "10.02" }, { "item_id": 2, "productName": "test123", "count": 1, "price": "100.00" } ]
    this.calculateTotal();

    // this.orderSub =  this.orders$.subscribe((results) => {
    //   this.orders = {...results};
    //   if(results && results.orderDetails)  {
    //     this.updatedOrders = results.orderDetails.slice(0);
    //     this.calculateTotal();
    //   }
    // });

  }

  ngOnDestroy(): void {
    
  }

 
  constructor(public modalController: ModalController) { }


}
