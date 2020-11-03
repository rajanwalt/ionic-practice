import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

@Component({
  selector: 'app-orders-tab',
  templateUrl: './orders-tab.component.html',
  styleUrls: ['./orders-tab.component.scss'],
})
export class OrdersTabComponent implements OnInit {

  @ViewChild('searchbar') searchbar: IonSearchbar;
  
  isSerachActive : boolean =  false;
  searchText: string = "";

  public orders$ : Observable<any> = of([
    {
      id: 1234,
      name : "test user",
      orderTotal : 150,
      paymentType: "Credit Card",
      paymentStatus : "Pending",
      orderStatus : "Pending",
      orderDate : "2020-03-25"
    },
    {
      id: 1034,
      name : "test user",
      orderTotal : 150,
      paymentType: "Credit Card",
      paymentStatus : "Pending",
      orderStatus : "Pending",
      orderDate : "2020-03-25"
    },
    {
      id: 1294,
      name : "test user",
      orderTotal : 150,
      paymentType: "Credit Card",
      paymentStatus : "Pending",
      orderStatus : "Pending",
      orderDate : "2020-03-25"
    },
    {
      id: 134,
      name : "test user2",
      orderTotal : 1500,
      paymentType: "Credit Card",
      paymentStatus : "Pending",
      orderStatus : "Pending",
      orderDate : "2020-09-25"
    }
  ]);

  getGroupBy(order)  {
    return order &&  (_.groupBy(order, "orderDate"))
  }

  onEnableSearch()  {
    setTimeout(() => this.searchbar &&  this.searchbar.setFocus(), 500);
  }

  onSearch(event)  {
    let searchText = event.target.value;
    this.searchText = searchText;
  }
  onCancel()  {
    this.isSerachActive = false;
    this.searchText = "";
  }

  onViewOrder(item)  {
    const {id} = item;

    this.navCtrl.navigateForward(`/order/${id}`)
  }

  onCreateNewOrder()  {
    this.navCtrl.navigateForward('/order')
  }

  
  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

}
