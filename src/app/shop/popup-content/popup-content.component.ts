import { Component, OnInit } from '@angular/core';

import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: ['./popup-content.component.scss'],
})
export class PopupContentComponent implements OnInit {


  constructor(public popoverCtrl : PopoverController) { }

  onSelect(selectedItem) {
    this.popoverCtrl.dismiss(selectedItem)
  }

  ngOnInit() {}

}
