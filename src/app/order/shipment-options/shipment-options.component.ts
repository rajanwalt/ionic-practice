import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AddCustomRateModalComponent } from './../add-custom-rate-modal/add-custom-rate-modal.component';

@Component({
  selector: 'app-shipment-options',
  templateUrl: './shipment-options.component.html',
  styleUrls: ['./shipment-options.component.scss'],
})
export class ShipmentOptionsComponent implements OnInit {

  goBack()  {
    this.navCtrl.back();
  }

  async onShowDeliveryRateModal()  {
    
    const modal = await this.modalController.create({
      component: AddCustomRateModalComponent,
      cssClass: 'delivery-rate-modal-custom-class',
      
    });
    return await modal.present();
  }

  constructor(private navCtrl: NavController, public modalController: ModalController) { }

  ngOnInit() {}

}
