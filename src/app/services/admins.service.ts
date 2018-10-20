import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { LoginComponent } from '../pages/login/login.component';
import { environment } from "./../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  authToken: any;
  serverUrl: string = environment.serverUrl
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  // list all Receipt submited by user and exchange and ready for admin response
  ListPending() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.get(`${this.serverUrl}/admins/list-pending-receipt`, { headers: headers })
  }
  ListApproved() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.get(`${this.serverUrl}/admins/list-approved-receipt`, { headers: headers })
  }
  ListRejected() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.get(`${this.serverUrl}/admins/list-rejected-receipt`, { headers: headers })
  }
  approveReceipt(form) {

    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.post(`${this.serverUrl}/admins/approve-receipt`, form, { headers: headers })
  }
  rejectReceipt(form) {


    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.post(`${this.serverUrl}/admins/reject-receipt`, form, { headers: headers })
  }
  lisPendingBurn() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.get(`${this.serverUrl}/admins/list-pending-burn`, { headers: headers })
  }
  listApprovedBurn() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.get(`${this.serverUrl}/admins/list-approved-burn`, { headers: headers })
  }
  listRejectedBurn() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.get(`${this.serverUrl}/admins/list-rejected-burn`, { headers: headers })
  }
  rejectBurn(form) {
    //console.log(form);

    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.post(`${this.serverUrl}/admins/reject-burn`, form, { headers: headers })
  }
  approveBurn(form) {
    //console.log(form);
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.post(`${this.serverUrl}/admins/approve-burn`, form, { headers: headers })
  }
  activeUser(email) {

    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/admins/enable`, email, { headers: headers })
  }
  deactiveUser(email) {


    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/admins/disable`, email, { headers: headers })
  }
  verifykyc(form) {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.serverUrl}/admins/verifykyc`, form, { headers: headers })
    // .map(res => res.json());
  }
  changeRole(form) {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.serverUrl}/admins/changeroles`, form, { headers: headers })
    // .map(res => res.json());
  }
  getUserList() {

    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.serverUrl}/admins/users`, { headers: headers })
      .map(result => result);
  }
  getUserListKyc() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.serverUrl}/admins/listkyc`, { headers: headers })
    // .map(res => res.json());
  }
  // Register Admin
  registerAdmin(form) {
    //console.log(form);


    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let body = new FormData();
    body.append('email', form.email);
    body.append('firstName', form.firstName);
    body.append('lastName', form.lastName);
    body.append('roles', JSON.stringify(form.roles));
    body.append('image', form.image);

    return this.http.post(`${this.serverUrl}/admins/register-admin`, body, { headers: headers })
  }
  registerExchanger(form) {

    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let body = new FormData();
    body.append('email', form.email);
    body.append('firstName', form.firstName);
    body.append('lastName', form.lastName);
    body.append('address', form.address);
    body.append('telephone', form.telephone);
    body.append('image', form.image);

    return this.http.post(`${this.serverUrl}/admins/register-exchanger`, body, { headers: headers })
  }
  exchangerList() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.serverUrl}/admins/exchangers`, { headers: headers })
  }
  Allroles() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);

    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.serverUrl}/admins/all-roles`, { headers: headers })
  }
  roles() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);

    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.serverUrl}/admins/roles`, { headers: headers })
  }

  getTransferList() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/admins/list-ready-transfer`, { headers: headers })
    .map(resp => {
      return resp['transferRequests']
    })
  }
  alltransferList(){
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/admins/list-pending-transfer`, { headers: headers })
    .map(resp => {
      return resp['transferRequests']
    })
  }
  getKyc(email) {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.serverUrl}/admins/get-kyc`, email, { headers: headers })
    // .map(res => res.json());
  }
  approveTransfer(form){
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.post(`${this.serverUrl}/admins/approve-transfer`, form, { headers: headers })
  }
  rejectTransfer(form){
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.post(`${this.serverUrl}/admins/reject-transfer`, form, { headers: headers })
  }
  listAdmins() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/admins${this.serverUrl}/admins`, { headers: headers })
  }
}
