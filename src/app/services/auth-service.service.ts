import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "./../../environments/environment";
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  roles: any;
  authToken: any;
  user: any;
  serverUrl: string = environment.serverUrl
  constructor(private http: HttpClient) {
    // this.isDev = true;
  }
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.serverUrl}/users/register`, user, { headers: headers })

  }

  //Authenticate
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.serverUrl}/accounts/authenticate`, user, { headers: headers })
  }
// Forgot Password
  forgetPass(email) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.serverUrl}/accounts/forgotpassword`, email, { headers: headers })
  }

  //send KYC request from User to Admin
  updatekyc(form) {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'multipart/form-data');
    let body = new FormData();
    // body.append('email', form.email);
    body.append('firstName', form.firstname);
    body.append('lastName', form.lastname);
    body.append('birthDate', form.birth);
    body.append('telephone', form.phone);
    body.append('walletAddress', form.wallet);
    body.append('hasWallet', form.hasWallet);
    body.append('passportImage', form.passportImage);
    body.append('image', form.image);
    //console.log(body);

    return this.http.post(`${this.serverUrl}/users/updatekyc`, body, { headers: headers })

  }
// user profile information
  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.serverUrl}/users/profile`, { headers: headers })
    // .map(res => res.json());
  }
  // Get Referals
  getReferal() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.serverUrl}/users/getreferal`, { headers: headers })

  }
  //get KYC code
  gtKycCode() {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);

    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.serverUrl}/users/kyc-code`, { headers: headers })
  }
  //store user data to localStorage
  storeUserData(token, user) {

    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('roles', JSON.stringify(user.accountType));
    this.authToken = token;
    this.roles = user.roles
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loadRole() {
    const roles = localStorage.getItem('roles');
    return roles;
  }


  //reset password
  resetPasswor(form) {
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.serverUrl}/users/changepassword`, form, { headers: headers })
    // .map(res => res.json());
  }
  ForgetResetPass(form) {
    //console.log(form);

    let headers = new HttpHeaders({
    });
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.serverUrl}/accounts/resetpassword`, form, { headers: headers })
    // .map(res => res.json());
  }

  loggedIn() {
    // return tokenNotExpired('id_token');
    const token = localStorage.getItem('id_token');

    return helper.isTokenExpired(token);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  signContract(type) {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/users/sign-contract`, type, { headers: headers })
    // .map(result => result);
  }

  createReceipt(form) {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/users/create-receipt`, form, { headers: headers })
  }

  listReceipt() {

    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/list-receipt`, { headers: headers })
  }
  listPendingReceipt() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/list-pending-receipt`, { headers: headers })
  }
  getBalance() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/balance`, { headers: headers })
  }
  uploadReceipt(form) {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    headers.append('Authorization', this.authToken);
    let body = new FormData();
    body.append('receipt', form.receipt);
    body.append('receiptNumber', form.receiptNumber);

    return this.http.post(`${this.serverUrl}/users/complete-receipt`, body, { headers: headers })

  }
  burn(form) {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/users/burn`, form, { headers: headers })

  }
  transfer(form) {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/users/transfer`, form, { headers: headers })

  }
  listAllTransfer() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/list-transfer`, { headers: headers })
  }
  listPendingTransfer() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/list-pending-transfer`, { headers: headers })
  }
  listPendingBurn() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/list-pending-burn`, { headers: headers })
  }
  listAllBurn() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/list-burn`, { headers: headers })
  }
  verifyBurn(form) {
    // //console.log(form);

    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/users/burn-verify`, form, { headers: headers })

  }
  resendConfirmCode(form) {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/users/burn-resend-token`, form, { headers: headers })
  }
  rejectBurn(form) {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/users/burn-cancel`, form, { headers: headers })

  }
  exchangerList() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });


    return this.http.get(`${this.serverUrl}/users/exchangers`, { headers: headers })
  }
  getExchanger(email) {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });


    return this.http.post(`${this.serverUrl}/users/exchanger`, email, { headers: headers })
  }


}