import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class MonekatService {

  hostName:string = "http://ec2-35-180-34-177.eu-west-3.compute.amazonaws.com:8000";

  getGoogleLatLng(address): Observable<any> {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${environment.googleKey}`
    return this.http.get(url);
  }

  getShopDetails() : Observable<any>  {
    let url = this.hostName +'/api/services'
    return this.http.get(url);
  }

  postShopDetails(shopData : FormData) : Observable<any>  {
    let url = this.hostName +'/api/services'
    return this.http.post(url, shopData);
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

  getCatalogue(queryData : object) : Observable<any>  {
    let url = this.hostName +'/api/items'
    let queryParams = new HttpParams().set('service_id', queryData['service_id']);
    return this.http.get(url, {params: queryParams});
  }
  
  addCatalogue(catalogue: any) : Observable<any>  {
    let url = this.hostName +'/api/items'
    return this.http.post(url, catalogue);
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
    let url = this.hostName +`api/orders/${orderId}`;
    return this.http.get(url).pipe(map(data => {
      data['deliveryMethod'] = [];
      data['paymentType'] = [];
      return data;
    }));

    // let url ='./../../assets/json/order-summary.json'
    // return this.http.get(url)
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
    let url = this.hostName +'/api/vat';
    
    return this.http.post(url, vatDetails);
  }

  getWallet(): Observable<any>  {
    let url = this.hostName +'/api/wallet'
    return this.http.get(url);
  }

  postWallet(data: any): Observable<any>  {
    let url = this.hostName +'/api/wallet';
    
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

  updateAccount(data: any): Observable<any>  {
    let url = this.hostName +'/api/register';
    
    return this.http.put(url, data);
  }

  login(data: any): Observable<any>  {
    let url = this.hostName +'/api/login';
    return this.http.post(url, data);
    // let url ='./../../assets/json/user.json'
    // return this.http.get(url);

  }

  

  constructor(private http: HttpClient, private platform: Platform) { }
}
