import { Component, OnInit } from '@angular/core';
import { Url } from 'url';
import { Router } from '@angular/router';

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

  photos : Photo[] = [
    {
      webviewPath : "https://developer.apple.com/app-store/marketing/guidelines/images/thumbnail-iMac_2x.png",
      filePath : ""
    },
    {
      webviewPath : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUW7xWzkLA2dm7zF26WuER47gprATXwZ8uFlxC_9HQ7PgDJlL2&usqp=CAU",
      filePath : ""
    },
    {
      webviewPath : "https://locate.apple.com/resources/images/widgets/AppleAuthorizedResellers_long_2x.png",
      filePath : ""
    },
    {
      webviewPath : "https://mobilecontent.costco.com/live/resource/img/static-us-landing-pages/19w04131-apple-lp-mac.png",
      filePath : ""
    }
  ];

  bannerPhoto : string = this.photos[0].webviewPath;


  itemDetails = {
    id : 1,
    productName: "Test",
    price: "13",
    additionalDetails: "lorn ipsum",
    delivery: true,
    dimension: true,
    dimensionDetails: {
      weight : "1",
      length : "30",
      width : "40",
      height : "40"
    }
  } 

  onSetBannerImg(selectedImg : Photo)  {
    this.bannerPhoto = selectedImg.webviewPath;
  }

  onEdit()  {
    let item_id = this.itemDetails.id;

    this.router.navigate(['/shop/add_catalogue_item'], { queryParams: {id : item_id }});
  }

  constructor(private router: Router) { }

  ngOnInit() {}

}