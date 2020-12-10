import { Component, OnInit } from '@angular/core';
import { Url } from 'url';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { selectCatalogue, selectCurrency } from 'src/app/store/selectors';
import { flatMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { hostName } from './../../common/hostname';

interface Photo  {
  filePath :  string,
  webviewPath : string
}

@Component({
  selector: 'app-view-catalogue',
  templateUrl: './view-catalogue.component.html',
  styleUrls: ['./view-catalogue.component.scss'],
})
export class ViewCatalogueComponent implements OnInit {
  
  currency$ = this._store.select(selectCurrency);
  
  photos = [];
  
  isActive = 0;
  hostName = hostName;

  bannerPhoto = this.photos.length ?  this.photos[0] : ''

  itemDetailsSub : Subscription;

  itemDetails = null;

  onSetBannerImg(selectedImg)  {
    this.bannerPhoto = selectedImg;
  }

  onEdit()  {
    let item_id = this.itemDetails.id;

    this.router.navigate(['/shop/add_catalogue_item'], { queryParams: {id : item_id }});
  }

  constructor(private router: Router, private _store: Store<State>,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {}

  ionViewDidEnter(){
    let itemId = this.activatedRoute.snapshot.queryParamMap.get('id');

    if(itemId !=  undefined)  {
      this.itemDetailsSub = this._store.select(selectCatalogue).pipe(
        flatMap(items => items.filter( entry => +itemId == entry.id))
      ).subscribe(item => {
        this.itemDetails = item;
        
        if(item['images'] && item['images'].length)  {
          let images = [...item['images']].reverse();

          images.filter((data, index) => index < 4).map((data, index) => {

            let filename = data['filename'];
            let webviewPath = `${hostName}/api/services/downloadfile/${filename}`
            this.photos[index] = webviewPath
          })

          this.bannerPhoto = this.photos[0];
        }
      });
    }
  }

  ionViewDidLeave() {
   if(this.itemDetailsSub)  {
     this.itemDetailsSub.unsubscribe();
   }
  }

}
