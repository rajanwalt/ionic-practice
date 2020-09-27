import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { OrderDetails } from './../../order/models';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  @Input() public order : OrderDetails;

  public count : number  = 1;
  public price: number = 0;
  public name: string = ""; 

  @Output() counterValue = new EventEmitter<any>();

  onClickCounter(actionType : string)  {
    
    if(actionType == 'increase')  {
      this.count = this.count + 1;
    }
    else  {
      this.count = this.count - 1;
    }

    // this.counterValue.emit({count : this.count, productName: this.order.productName, price : this.totalPrice, item_id: this.order.item_id});
    this.counterValue.emit({...this.order, count : this.count});
    
  }

  get totalPrice(): number  {
    return this.price * this.count;
  }

  constructor() { }

  ngOnInit() {
    this.count = this.order && this.order.count;
    this.price = this.order && this.order.price;
  }

}
