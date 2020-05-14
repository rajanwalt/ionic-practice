import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonekatService {

  getGoogleLatLng(address): Observable<any> {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${environment.googleKey}`
    return this.http.get(url);
  }

  getShopDetails() : Observable<any>  {
    let url = '/api/shopDetails'
    return this.http.get(url);
  }

  postShopDetails(shopData : FormData) : Observable<any>  {
    let url = '/api/shopDetails'
    return this.http.post(url, shopData);
  }

  getCustomers() : Observable<any>  {
    let url = '/api/customers'
    return this.http.get(url);
  }
  
  addCustomer(customerData: any) : Observable<any>  {
    let url = '/api/customers'
    return this.http.post(url, customerData);
  }

  getCatalogue() : Observable<any>  {
    let url = '/api/catalogue'
    return this.http.get(url);
  }
  
  addCatalogue(catalogue: any) : Observable<any>  {
    let url = '/api/catalogue'
    return this.http.post(url, catalogue);
  }

  

  constructor(private http: HttpClient) { }
}
