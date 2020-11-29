import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { Form } from '@angular/forms';

import { hostName } from './../common/hostname';


@Injectable({
  providedIn: 'root'
})
export class MonekatService {

  hostName = hostName;

  getGoogleLatLng(address): Observable<any> {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${environment.googleKey}`
    return this.http.get(url);
  }

  getShopDetails(serviceId) : Observable<any>  {
    let url = `${this.hostName}/api/services/${serviceId}`
    return this.http.get(url);
  }

  postShopDetails(shopData) : Observable<any>  {
    let url = this.hostName +'/api/services'
    return this.http.post(url, shopData);
  }

  getOrderList(serviceId) : Observable<any>  {
    let url = `${this.hostName}/api/orders`
    let queryParams = new HttpParams().set('service_id', serviceId);
    return this.http.get(url, { params: queryParams });
  }
  


  updateShopDetails(shopData) : Observable<any>  {
    let url = `${this.hostName}/api/services/${shopData['id']}`
    return this.http.put(url, shopData);
  }

  getCustomers(queryData : any) : Observable<any>  {
    let url = this.hostName +'/api/customers'
    let queryParams = new HttpParams().set('service_id', queryData['service_id']);
    return this.http.get(url, {params: queryParams});
  }
  
  addCustomer(customerData: any) : Observable<any>  {
    let url = this.hostName +'/api/customers'
    return this.http.post(url, customerData);
  }

  putCustomer(customerData: any) : Observable<any>  {
    let url = `${this.hostName}/api/customers/${customerData['id']}`
    return this.http.put(url, customerData);
  }

  getCatalogue(queryData : object) : Observable<any>  {
    let url = this.hostName +'/api/items'
    let queryParams = new HttpParams().set('service_id', queryData['service_id']);
    return this.http.get(url, {params: queryParams});
  }
  
  addCatalogue(catalogue: any) : Observable<any>  {
    let url = this.hostName +'/api/items'
    return this.http.post(url, catalogue);
  }

  updateCatalogue(catalogue: any) : Observable<any>  {
    let url = `${this.hostName}/api/items/${catalogue['id']}`
    return this.http.put(url, catalogue);
  }

  postOrderSummary(orderSummary: any): Observable<any>  {
    let url = this.hostName +'/api/orders/add_with_orderitems';
    
    return this.http.post(url, orderSummary);
  }

  getOrderSummary(queryData : object) : Observable<any>  {
    let url = this.hostName +'/api/order/add_with_orderitems';

    let queryParams = new HttpParams().set('orderId', queryData['orderId']);
    return this.http.get(url, {params: queryParams});
  }

  getOrder({orderId})  {
    let url = this.hostName +`/api/orders/${orderId}`;
    // return this.http.get(url).pipe(map(data => {
    //   data['deliveryMethod'] = [];
    //   data['paymentType'] = [];
    //   return data;
    // }));

    // let url ='./../../assets/json/order-summary.json'
    return this.http.get(url)
  }

  updateOrderSummary(orderSummary: any): Observable<any>  {
    let url = this.hostName +'/api/orders/add_with_orderitems';
    
    return this.http.put(url, orderSummary);
  }

  getPaymentSettings(): Observable<any>  {
    let url = this.hostName +'/api/payment_settings'
    return this.http.get(url);
  }

  updatePaymentSettings(paymentMethods: any): Observable<any>  {
    let url = this.hostName +'/api/payment_settings';
    
    return this.http.post(url, paymentMethods);
  }

  getVat(): Observable<any>  {
    let url = this.hostName +'/api/vat'
    return this.http.get(url);
  }

  postVat(vatDetails: any): Observable<any>  {
    let url = this.hostName +'/api/users/settings';
    
    return this.http.post(url, vatDetails);
  }

  postSettings(settings: any): Observable<any>  {
    let url = this.hostName +'/api/users/settings';
    
    return this.http.post(url, settings);
  }

  getWallet(payUserId): Observable<any>  {
    let url = `${this.hostName}/api/users/balance/${payUserId}`
    return this.http.get(url);
  }

  ReleaseWallet(data: any): Observable<any>  {
    let url = this.hostName +'api/users/payout';
    
    return this.http.post(url, data);
  }

  getShippingCharges(): Observable<any>  {
    let url = this.hostName +'/api/users/charges'
    return this.http.get(url);
  }

  postShippingCharges(data: any): Observable<any>  {
    let url = this.hostName +'/api/users/charges';
    
    return this.http.post(url, data);
  }

  createAccount(data: any): Observable<any>  {
    let url = this.hostName +'/api/register';
    
    return this.http.post(url, data);
  }

  updateAccount(userData: any): Observable<any>  {
    let url = `${this.hostName}/api/users/${userData['id']}`;
    
    return this.http.put(url, userData);
  }

  postFile(formData) : Observable<any>  {
    let url = this.hostName + "/api/services/uploadfile";  

    return this.http.post(url, formData);
  }
  getFile(filename) : Observable<any>  {
    let url = `${this.hostName}/api/services/downloadfile/${filename}`;

    return this.http.get(url);
  }

  login(data: any): Observable<any>  {
    let url = this.hostName +'/api/login';
    return this.http.post(url, data);
    // let url ='./../../assets/json/user.json'
    // return this.http.get(url);

  }

  getPayStatus(id) : Observable<any>  {
    let url = `${this.hostName}/api/orders/paystatus/${id}`;

    return this.http.get(url);
  }
  
  checkout(data): Observable<any>  {
    let url = this.hostName +'/api/orders/payorder';

    return this.http.post(url, data);
  }

  constructor(private http: HttpClient, private platform: Platform) { }
}
