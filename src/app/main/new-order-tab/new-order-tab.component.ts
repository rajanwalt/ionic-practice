import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order-tab',
  templateUrl: './new-order-tab.component.html',
  styleUrls: ['./new-order-tab.component.scss'],
})
export class NewOrderTabComponent implements OnInit {

  onCreateOrder()  {
    this.router.navigate(['/order']);
  }
  
  constructor(private router: Router) { }

  ngOnInit() {}

}
