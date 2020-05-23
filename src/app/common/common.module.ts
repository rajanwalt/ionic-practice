import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { ListFilterPipe } from './list-filter.pipe';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  imports: [ CommonModule, IonicModule ],
  declarations: [
    ListFilterPipe,
    CounterComponent
  ],
  providers: [SocialSharing],
  exports: [CommonModule, ListFilterPipe, CounterComponent]
})
export class SharedModule {}
