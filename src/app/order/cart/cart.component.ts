import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { State } from './../../store/state';
import { Order, OrderDetails, OrderSummary, Cart, OrderDetailsModel } from './../models';
import { selectLastOrder } from './../../store/selectors';
import { UpdateOrderSummary, SetOrder, GetFinalOrderSummary } from './../../store/actions';

import { SocialMediaSharingService } from './../../common';
import * as _ from 'underscore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  public orders$: Observable<Cart> = this._store.select(selectLastOrder);
  public orders : Cart = null;
  public orderSub : Subscription;

  public updatedOrders = [];
  public subTotal;
  public isCheckoutLinkGenerated = false;
  
  public removeItem;

  calculateTotal()  {
    
    if(this.updatedOrders.length > 1)  {
      this.subTotal = this.updatedOrders.reduce((currentvalue, nextValue) => (+currentvalue.price * currentvalue.count) + (+nextValue.price * nextValue.count));
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
          
          //this._store.dispatch(new SetOrder({orderDetails: this.updatedOrders}));
          this.orders.orderDetails = [...this.updatedOrders]
        }
    }
    else {
      this.updatedOrders.push(orderDetails);
    }


    this.calculateTotal()

  }


  onUpdateOrderSummary()  {
    const finalOrderSummary = { ...this.orders, totalAmount: this.subTotal, status: "UPDATED"};
    finalOrderSummary.orderDetails = this.updatedOrders.splice(0);

    // this._store.dispatch(new UpdateOrderSummary(OrderSummary.formatAPI(finalOrderSummary)));

    if(this.orders.customer)  {
      this.navCtrl.navigateForward('/checkout/delivery')
    }
    else {
      //navigate to add customer page to enter the customer details 
    }

    
  }

  ngOnInit() {
    let orderId = this.activatedRoute.snapshot.params.orderId;
    
    this._store.dispatch(new GetFinalOrderSummary({orderId}));

    this.orderSub =  this.orders$.subscribe((results) => {
      this.orders = {...results};
      if(results && results.orderDetails)  {
        this.updatedOrders = results.orderDetails.slice(0);
        this.calculateTotal();
      }
    });
  }

  ngOnDestroy(): void {
    if(this.orderSub)  {
      this.orderSub.unsubscribe();
    }
    
  }

  ionViewWillEnter()  {
  }

 
  constructor(private _store: Store<State>,
    private socialMediaSharingService: SocialMediaSharingService,
    private router: Router,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute) { }


}
