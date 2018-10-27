import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from "./../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class RpcService {
  authToken: any;
  serverUrl:string = environment.serverUrl;
  constructor(private http: HttpClient) { }
  //load JWT token for Authorization in server
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  //get price by ether or euro
  //used in dashboard
  getPrice(type){
    this.loadToken();
    let headers = new HttpHeaders({       'Authorization' : this.authToken     });

    return this.http.post(`${this.serverUrl}/rpc/get-price`,type, { headers: headers })
    .map(result => result);
  }
  //get last price of token right now
  //used in dashboard and user burn
  getLastPrice(){

    return this.http.get(`${this.serverUrl}/rpc/get-last-price`)

  }
  //set token price by admin
  setPrice(price){
    this.loadToken();
    let headers = new HttpHeaders({       'Authorization' : this.authToken     });

    return this.http.post(`${this.serverUrl}/rpc/token-price`,price, { headers: headers })
    .map(result => result);
  }
}
