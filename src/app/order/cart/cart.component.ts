import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { State } from './../../store/state';
import { Order, OrderDetails, OrderSummary } from './../models';
import { selectOrders } from './../../store/selectors';
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

  public orders$: Observable<Order> = this._store.select(selectOrders);
  public orders = null;
  public orderSub : Subscription;

  public updatedOrders = [];
  public subTotal;
  public isCheckoutLinkGenerated = false;
  
  public removeItem;

  calculateTotal()  {
    
    if(this.updatedOrders.length > 1)  {
      this.subTotal = this.updatedOrders.reduce((currentvalue, nextValue) => +currentvalue.price + +nextValue.price);
    }
    else  {
      this.subTotal = this.updatedOrders[0]['price'];
    }
  
  }
   
  getCounterValue(orderDetails: OrderDetails)  {
    let {item_id, count} = orderDetails;

    
    let isOrderExit = _.findIndex(this.updatedOrders, {item_id});
    
    
    if(isOrderExit >= 0)  {
        if(count > 0)  {
          this.updatedOrders[isOrderExit] = {...orderDetails};
        }
        else {
          this.updatedOrders.splice(isOrderExit, 1);
          this._store.dispatch(new SetOrder({orderDetails: this.updatedOrders}));
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
    console.log(finalOrderSummary);
    console.log(OrderSummary.formatAPI(finalOrderSummary));
    this._store.dispatch(new UpdateOrderSummary(OrderSummary.formatAPI(finalOrderSummary)));
    
  }

  ngOnInit() {
    let orderId = this.activatedRoute.snapshot.queryParamMap.get('orderId');
    
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