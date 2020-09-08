import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getCustomers(queryData : any) : Observable<any>  {
    let url = '/api/customers'
    let queryParams = new HttpParams().set('service_id', queryData['service_id']);
    return this.http.get(url, {params: queryParams});
  }
  
  addCustomer(customerData: any) : Observable<any>  {
    let url = '/api/customers'
    return this.http.post(url, customerData);
  }

  getCatalogue(queryData : object) : Observable<any>  {
    let url = '/api/items'
    let queryParams = new HttpParams().set('service_id', queryData['service_id']);
    return this.http.get(url, {params: queryParams});
  }
  
  addCatalogue(catalogue: any) : Observable<any>  {
    let url = '/api/items'
    let tempCatalogue = {...catalogue, shopId:1}
    return this.http.post(url, tempCatalogue);
  }

  postOrderSummary(orderSummary: any): Observable<any>  {
    let url = '/api/orders/add_with_orderitems';
    
    return this.http.post(url, orderSummary);
  }

  

  constructor(private http: HttpClient) { }
}
