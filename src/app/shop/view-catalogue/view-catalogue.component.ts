import { Component, OnInit } from '@angular/core';
import { Url } from 'url';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { selectCatalogue } from 'src/app/store/selectors';
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

  // photos : Photo[] = [
  //   {
  //     webviewPath : "https://developer.apple.com/app-store/marketing/guidelines/images/thumbnail-iMac_2x.png",
  //     filePath : ""
  //   },
  //   {
  //     webviewPath : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUW7xWzkLA2dm7zF26WuER47gprATXwZ8uFlxC_9HQ7PgDJlL2&usqp=CAU",
  //     filePath : ""
  //   },
  //   {
  //     webviewPath : "https://locate.apple.com/resources/images/widgets/AppleAuthorizedResellers_long_2x.png",
  //     filePath : ""
  //   },
  //   {
  //     webviewPath : "https://mobilecontent.costco.com/live/resource/img/static-us-landing-pages/19w04131-apple-lp-mac.png",
  //     filePath : ""
  //   }
  // ];

  photos = [];
  
  isActive = 0;
  hostName = hostName;

  bannerPhoto = this.photos.length ?  this.photos[0] : ''

  itemDetailsSub : Subscription;

  // itemDetails = {
  //   id : 1,
  //   productName: "Test",
  //   price: "13",
  //   additionalDetails: "lorn ipsum",
  //   delivery: true,
  //   dimension: true,
  //   dimensionDetails: {
  //     weight : "1",
  //     length : "30",
  //     width : "40",
  //     height : "40"
  //   }
  // } 

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

  ionViewWillEnter(){
    let itemId = this.activatedRoute.snapshot.queryParamMap.get('id');

    if(itemId !=  undefined)  {
      this.itemDetailsSub = this._store.select(selectCatalogue).pipe(
        flatMap(items => items.filter( entry => +itemId == entry.id))
      ).subscribe(item => {
        this.itemDetails = item;
        
        if(item['images'] && item['images'].length)  {
          item['images'].filter((data, index) => index < 4).map((data, index) => {

            let filename = data['filename'];
            let webviewPath = `${hostName}/api/services/downloadfile/${filename}`
            this.photos[index] = webviewPath
          })

          this.bannerPhoto = this.photos[0];
        }
      });
    }
  }

  ionViewWillLeave() {
   if(this.itemDetailsSub)  {
     this.itemDetailsSub.unsubscribe();
   }
  }

}
