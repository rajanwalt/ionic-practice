import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    let orderId = this.activatedRoute.snapshot.params.orderId;
    
  }

  goBack()  {
    this.navCtrl.back();
  }

}
