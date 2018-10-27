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
  //used in admin-buy component
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
  //used in admin-buy component
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
    //used in admin-buy component
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
    //used in admin-buy component
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
    //used in admin-buy component
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
  //used in admin-burn
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
    //used in admin-burn
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
    //used in admin-burn
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
    //used in admin-burn
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
    //used in admin-burn
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
  //used in user-list.component.ts
  activeUser(email) {

    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/admins/enable`, email, { headers: headers })
  }
  // Disable User
    //used in user-list.component.ts
  deactiveUser(email) {


    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/admins/disable`, email, { headers: headers })
  }
  // Verify KYC information that user sent to admin
  //used in KYCadmin.component
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
// Change Roles will set roles to admins for access level
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
  // list All users registered in server
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
  // Get Users List that sent KYC request
    //used in KYCadmin.component
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

  // Register new Admin by super admin
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
    // Register Exchanger by admin
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
  // list All exchangers that admin submited
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
//used in admin-transfer.component.ts
  getTransferList() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/admins/list-ready-transfer`, { headers: headers })
    .map(resp => {
      return resp['transferRequests']
    })
  }
  // list all TransferRequest submited by user and ready for admin response
  //used in admin-transfer.component.ts
  alltransferList(){
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/admins/list-pending-transfer`, { headers: headers })
    .map(resp => {
      return resp['transferRequests']
    })
  }
  // Get KYC informations of a user (sent user email to server and receive user info)
    //used in user-list.component.ts
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
  //used in admin-transfer component
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
    //used in admin-transfer component
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
  //used in addadmin and change role component
  listAdmins() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/admins${this.serverUrl}/admins`, { headers: headers })
  }
}
