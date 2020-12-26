import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { MonekatService } from './../../APIs/monekat.service'

@Component({
  selector: 'app-transaction-status',
  templateUrl: './transaction-status.component.html',
  styleUrls: ['./transaction-status.component.scss'],
})
export class TransactionStatusComponent implements OnInit {

  status = ` <p class="trans-processing"> Retrieving the payment status... </p> ` ;
  statusSub : Subscription;

  constructor(private monekatService: MonekatService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let transactionId  = this.activatedRoute.snapshot.queryParamMap.get('transactionId');
    if(transactionId)  {
     this.statusSub =  this.monekatService.getPayStatus(transactionId).subscribe(response => {
        
      // this.status = this.transactionStatus[response['Status']]
        
      if(response['Status'] == "SUCCEEDED")  {
            this.status = ` <p class="trans-success" >  Payment Successful ! </p> 
                            <p class="trans-message"> We are delighted to inform you that we received your payment. </p>`
      }
      else {
        this.status = ` <p class="trans-failed"> Payment Failed ! </p> 
        <p class="trans-message"> We are regret to inform you that <span>${response['ResultMessage']} by the user. </span> </p>`
      }
        
       
      })
    }
  }

  

}
