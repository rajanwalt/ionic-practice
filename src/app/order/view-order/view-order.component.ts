import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { Observable, of, Subscription } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { selectOrderList, selectCurrency } from './../../store/selectors';
import { MonekatService } from './../../APIs';

enum DeliveryStatus  {
  Pending = "Pending",
  ReadyForDelivery = "ReadyForDelivery",
  DeliveredToCustomer = "DeliveredToCustomer"
}

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  orders$: Observable<any> = this._store.select(selectOrderList);
  order = null;
  orderSub : Subscription;
  statusEmailSub : Subscription;
  currency$ = this._store.select(selectCurrency);
  deliveryStatus = DeliveryStatus
 
  
  constructor(private activatedRoute : ActivatedRoute, 
              private navCtrl: NavController,  
              private _store: Store<State>,
              private monekatService: MonekatService,
              private alertController: AlertController
               ) { }

  ngOnInit() {
    // let orderId = this.activatedRoute.snapshot.params.orderId;
    
  }

  call(phonenumber)  {
    if(phonenumber)  {
      window.open(`tel:${phonenumber}`, '_system')
    } 
  }

  goBack()  {
    this.navCtrl.back();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: `The Order status has been emailed to the customer`,
      buttons: ['OK']
    });

    await alert.present();
  }

  sendStatusMail(status, email)  {

    if(email && status)  {
      let payload = {
        status,
        email
      }
      this.statusEmailSub = this.monekatService.sendOrderStatusEmail(payload).subscribe( data => {
        if(data)  {
          this.presentAlert()
        }
      })
    }
    
  }

  ionViewDidEnter(){
    let orderId = this.activatedRoute.snapshot.params.id;

    this.orderSub = this.orders$.pipe(
      flatMap(items => items.filter( entry => orderId == entry.id)),
      // map(ListOfOrders.formatAPIArray)
    ).subscribe( order => {
        this.order = order
    })
  }

  ionViewDidLeave(){

    if(this.statusEmailSub)  {
      this.statusEmailSub.unsubscribe()
    }
   
  }

}
