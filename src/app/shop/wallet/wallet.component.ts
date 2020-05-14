import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


import {PopupContentComponent} from './../popup-content/popup-content.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {

  hasData : boolean = false;

  onSelect = () => {

  }

  async onShowPopup(ev: any) {  
    const popover = await this.popoverCtrl.create({  
        component: PopupContentComponent,  
        event: ev,  
        animated: true,  
        showBackdrop: true,
        componentProps: { PopoverController: this.popoverCtrl }  
    });  
    popover.present();  

    return await popover.onDidDismiss().then((EventData : any) => {
      switch(EventData.data)  {
         case 1 : {
          this.router.navigate(['/shop/add_wallet']);
          break;
         }
         case 2 : {
          //Call API to delete

          break;
         }
         default : {
           break;
         }
       }
    })
  }  
  
  constructor(public popoverCtrl: PopoverController, private router: Router) { }

  ngOnInit() {}

}
