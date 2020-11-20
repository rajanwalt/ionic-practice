import { Directive, ElementRef  } from '@angular/core';
import { AngularDelegate } from '@ionic/angular';

@Directive({
  selector: '[numberInput]',
  host: {
    '(ionChange)' : 'handleInput($event)'
  }
})
export class NumberInputDirective {

  constructor(public element : ElementRef) { 
  }

  handleInput(event)  {
    let regEx = /[^0-9\.]/g
    let value = event.detail.value
    
    let clean = value.replace(regEx, '');

    

    // this.element.nativeElement.value = 1
  }



}
