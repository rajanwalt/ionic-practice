import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {PopupContentComponent} from './../popup-content/popup-content.component';
import { selectWallet } from './../../store/selectors';
import { GetWallet } from './../../store/actions';

import { State } from './../../store/state';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {

  hasData : boolean = true;
  wallet$ =  this._store.select(selectWallet);
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

  onReleasePayment()  {

  }

  onAddItem()  {
    this.navCtrl.navigateForward('/shop/add_wallet');
  }
  
  constructor(public popoverCtrl: PopoverController, private router: Router, private _store: Store<State>, private navCtrl: NavController) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this._store.dispatch(new GetWallet({}));
    
    // this.WalletSub = this._store.select(selectWallet).subscribe(data => {
    //   data && this.vatForm.patchValue(data);
    // })
  }

}
