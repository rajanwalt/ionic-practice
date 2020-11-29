import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {PopupContentComponent} from './../popup-content/popup-content.component';
import { selectSettings, selectUser, selectWallet } from './../../store/selectors';
import { GetWallet, ReleaseWallet } from './../../store/actions';

import { State } from './../../store/state';
import { Observable, Subscription } from 'rxjs';
import { fees } from './../../common/models';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {

  hasPayoutMethod : boolean = false;
  fee = fees;

  user$: Observable<any> = this._store.select(selectUser)
  wallet$ =  this._store.select(selectWallet);
  settings$: Observable<any> = this._store.select(selectSettings);
  WalletSub: Subscription;
  userSub:Subscription;
  SettingsSub: Subscription;
  payUserId;
  userId: any;
  wallet = null
  payoutDetails = null

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
    if(this.wallet.Balance.Amount)  {
      let payload = {
        "fees": +this.wallet.Balance.Amount * 0.05,
        "amount": this.wallet.Balance.Amount,
        "userId": this.userId
      }
      this._store.dispatch(new ReleaseWallet(payload));
    }
  }

  onAddItem()  {
    this.navCtrl.navigateForward('/shop/add_wallet');
  }
  
  constructor(public popoverCtrl: PopoverController, private router: Router, private _store: Store<State>, private navCtrl: NavController) { }

  ngOnInit() {}

  ionViewDidEnter() {
    
    this.SettingsSub = this.settings$.subscribe(bankData => {
      if(bankData['iban'] && bankData['bankname'])  {
        this.payoutDetails = {
          bankname : bankData['bankname']
        }

        this.userSub = this.user$.subscribe( userData => {
          if(userData)  {
            this.userId = userData['id'];
            this.payUserId = userData['payuserid'];
    
            this._store.dispatch(new GetWallet(this.payUserId));
          }
        
        });
    
        this.WalletSub = this._store.select(selectWallet).subscribe(walletData => {
          if(walletData)  {
            let [wData] = walletData;
            this.wallet = wData;
          }
        })


        this.hasPayoutMethod = true
      }
      else {
        this.hasPayoutMethod = false
      }
    })
    
    
  }

  ionViewDidLeave(){
   if(this.SettingsSub)  {
    this.SettingsSub.unsubscribe()
   }
   if(this.userSub)  {
    this.userSub.unsubscribe()
  }
  if(this.WalletSub)  {
    this.WalletSub.unsubscribe();
  }
  }

}
