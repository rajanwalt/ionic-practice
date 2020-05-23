import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { State, Order, OrderDetails } from './../../store/state';
import { selectOrders } from './../../store/selectors';

import { SocialMediaSharingService } from './../../common';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  public orders$: Observable<any> = this._store.select(selectOrders);
  public orders : Order = null;

  public orderSub : Subscription;
  public orders1$: Observable<Order> = of(
    {
      customerId : 1,
      orderDetails : [
        {
          "catalogueId": 1,
          "price": 130,
          "productName": 'Test1',
          "count": 1
        },
        {
          "catalogueId": 2,
          "price": 130,
          "productName": 'Test2',
          "count": 1
        }
      ]
    });

  phoneNumber: string = "9698446776";
  
  public updatedOrders = [];
  public subTotal: number = 0;
  
  public SOCIALMEDIA = {
    WHATSAPP : "whatsapp",
    MESSENGER : "messenger",
    SMS : "sms",
    COPY : "copy",
    MORE : "more"
  }

  calculateTotal()  {
    this.subTotal = this.updatedOrders.reduce((currentvalue: OrderDetails, nextValue: OrderDetails) => currentvalue.price + nextValue.price)
  }

  getCounterValue(orderDetails: any)  {
    
    let {count, price, productName, catalogueId} = orderDetails;

    let isSelected = this.updatedOrders.filter(items => items['catalogueId'] == catalogueId);
    
    if(Array.isArray(isSelected) && isSelected.length > 0)  {

      this.updatedOrders.forEach(values => {
        if(values['catalogueId'] == catalogueId)  {
          values['price'] = price;
          values['count'] = count;
        }
      });
      
    }
    else {
      this.updatedOrders.push({ productName, catalogueId, price, count});
    }
    
    this.calculateTotal()
    console.log(this.updatedOrders);
  }

  get message()  {
    return "";
  }



  async onShare(appName)  {
    try {
      switch(appName)  {
        case this.SOCIALMEDIA.WHATSAPP : {
          break;
        }
        case this.SOCIALMEDIA.MESSENGER : {
          break;
        }
        case this.SOCIALMEDIA.SMS : {
          let status =  await this.socialMediaSharingService.shareViaSMS(this.message, this.phoneNumber);
          break;
        }
        case this.SOCIALMEDIA.COPY : {
          break;
        }
        default: {
  
        }
      }
    }
    catch(e)  {
      console.log(e);
    }
    
  }

  constructor(private _store: Store<State>,
  private socialMediaSharingService: SocialMediaSharingService) { }

  ngOnInit() {
    this.orderSub = this.orders1$.subscribe((results: Order) => {
      this.orders = results;
      this.updatedOrders = results['orderDetails'].map( val => val);
      this.calculateTotal();
    })

  }
  ngOnDestroy(): void {
    if(this.orderSub)  {
      this.orderSub.unsubscribe();
    }
    
  }

}
