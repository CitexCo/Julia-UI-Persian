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
  // list all Receipt approved by admin
  ListApproved() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.get(`${this.serverUrl}/admins/list-approved-receipt`, { headers: headers })
  }
  // list all Receipt rejected by admin
  ListRejected() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.get(`${this.serverUrl}/admins/list-rejected-receipt`, { headers: headers })
  }
  // approve receipt by admin
  approveReceipt(form) {

    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.post(`${this.serverUrl}/admins/approve-receipt`, form, { headers: headers })
  }
  // reject receipt by admin
  rejectReceipt(form) {


    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.post(`${this.serverUrl}/admins/reject-receipt`, form, { headers: headers })
  }
  // list all BurnRequest submited by user and ready for admin response
  lisPendingBurn() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.get(`${this.serverUrl}/admins/list-pending-burn`, { headers: headers })
  }
  // list all BurnRequest approved by admin
  listApprovedBurn() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.get(`${this.serverUrl}/admins/list-approved-burn`, { headers: headers })
  }
  // list all BurnRequest rejected by admin
  listRejectedBurn() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.get(`${this.serverUrl}/admins/list-rejected-burn`, { headers: headers })
  }
  // reject burn by admin
  rejectBurn(form) {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.post(`${this.serverUrl}/admins/reject-burn`, form, { headers: headers })
  }
  // approve burn by admin
  approveBurn(form) {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.post(`${this.serverUrl}/admins/approve-burn`, form, { headers: headers })
  }
  // Enable User
  activeUser(email) {

    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/admins/enable`, email, { headers: headers })
  }
  // Disable User
  deactiveUser(email) {


    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/admins/disable`, email, { headers: headers })
  }
  // Verify KYC
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
  // user, verifyKYC, changeRoles, answerTicket, userManager, RPCManager
// Change Roles
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
  // list All users
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
  // Get Users List for KYC
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
    // Register Exchanger
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
  // list All exchangers
  exchangerList() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.serverUrl}/admins/exchangers`, { headers: headers })
  }
  // list admin's own roles
  Allroles() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);

    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.serverUrl}/admins/all-roles`, { headers: headers })
  }
  // list admin's own roles
  roles() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);

    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.serverUrl}/admins/roles`, { headers: headers })
  }
// list all TransferRequest approved by admin
  getTransferList() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/admins/list-ready-transfer`, { headers: headers })
    .map(resp => {
      return resp['transferRequests']
    })
  }
  // list all TransferRequest submited by user and ready for admin response
  alltransferList(){
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/admins/list-pending-transfer`, { headers: headers })
    .map(resp => {
      return resp['transferRequests']
    })
  }
  // Get KYC informations of a user
  getKyc(email) {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.serverUrl}/admins/get-kyc`, email, { headers: headers })
    // .map(res => res.json());
  }
  // approve transfer by admin
  approveTransfer(form){
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.post(`${this.serverUrl}/admins/approve-transfer`, form, { headers: headers })
  }
  // reject transfer by admin
  rejectTransfer(form){
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');


    return this.http.post(`${this.serverUrl}/admins/reject-transfer`, form, { headers: headers })
  }
  //get list of all admins
  listAdmins() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/admins${this.serverUrl}/admins`, { headers: headers })
  }
}
