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
  //this function will receive registration values from user and send to server
  //used in register component
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.serverUrl}/users/register`, user, { headers: headers })

  }

  //Authenticate and login user will receive values from user and send to server
  //used in login component
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.serverUrl}/accounts/authenticate`, user, { headers: headers })
  }
  // Forgot Password will get email from user and send to server
  forgetPass(email) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.serverUrl}/accounts/forgotpassword`, email, { headers: headers })
  }

  //send KYC request from User to Admin 
  //used in KYCuser component
  //its contains photos so we used form data to send images to server
  updatekyc(form) {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });

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
  // get user profile full information
  //used almost in every component!
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
  // Get Referals that user have
  //used in referals component
  getReferal() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.serverUrl}/users/getreferal`, { headers: headers })

  }
  //get KYC code from server and pass it to KYCUser component
  gtKycCode() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });

    headers.append('Authorization', this.authToken);

    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.serverUrl}/users/kyc-code`, { headers: headers })
  }
  //stringfy and store user data to localStorage
  storeUserData(token, user) {

    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('roles', JSON.stringify(user.accountType));
    this.authToken = token;
    this.roles = user.roles
    this.user = user;
  }
  //load JWT token that saved in local storage
  //its saved as string so we should parse it to JSON
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
  //this function will receive new pass that user typed and send it to server
  ForgetResetPass(form) {
    //console.log(form);

    let headers = new HttpHeaders({
    });
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.serverUrl}/accounts/resetpassword`, form, { headers: headers })
    // .map(res => res.json());
  }
  //check if the JWT token has been expired or not
  loggedIn() {
    // return tokenNotExpired('id_token');
    const token = localStorage.getItem('id_token');

    return helper.isTokenExpired(token);
  }
  //logout function
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // signContract(type) {
  //    this.loadToken();
  //   let headers = new HttpHeaders({ 'Authorization': this.authToken });

  //   return this.http.post(`${this.serverUrl}/users/sign-contract`, type, { headers: headers })
  //   // .map(result => result);
  // }

  //this function will make new buy receipt for user
  //used in user-buy.component
  createReceipt(form) {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/users/create-receipt`, form, { headers: headers })
  }
  //get all receipts that user created
  //used in user-buy-history.component
  listReceipt() {

    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/list-receipt`, { headers: headers })
  }
  //get all pending receipts that user created
  //used in user-buy.component
  listPendingReceipt() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/list-pending-receipt`, { headers: headers })
  }
  //getting balance amount that user have
  //used in user-burn.component.ts and user-buy.component and dashboard
  getBalance() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/balance`, { headers: headers })
  }
  //after user created receipt with this function he/she could send receipts image to admin for verifing
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
  //getting values of burn request form from user and send it to server
  //used in user-burn.component.ts
  burn(form) {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/users/burn`, form, { headers: headers })

  }
  //getting values of transfer request form from user and send it to server
  //used in user-burn.component.ts
  transfer(form) {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.post(`${this.serverUrl}/users/transfer`, form, { headers: headers })

  }
  //get list of all transfer requests that user submited
    //used in user-burn-history.component.ts
  listAllTransfer() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/list-transfer`, { headers: headers })
  }
    //get list of all pending transfer requests that user submited
    //used in user-burn.component.ts
  listPendingTransfer() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/list-pending-transfer`, { headers: headers })
  }
      //get list of all pending burn requests that user submited
    //used in user-burn.component.ts
  listPendingBurn() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/list-pending-burn`, { headers: headers })
  }
    //get list of all burn requests that user submited
    //used in user-burn-history.component.ts
  listAllBurn() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    return this.http.get(`${this.serverUrl}/users/list-burn`, { headers: headers })
  }
  // verifyBurn(form) {
  //   // //console.log(form);

  //   this.loadToken();
  //   let headers = new HttpHeaders({ 'Authorization': this.authToken });

  //   return this.http.post(`${this.serverUrl}/users/burn-verify`, form, { headers: headers })

  // }
  // resendConfirmCode(form) {
  //   this.loadToken();
  //   let headers = new HttpHeaders({ 'Authorization': this.authToken });

  //   return this.http.post(`${this.serverUrl}/users/burn-resend-token`, form, { headers: headers })
  // }
  // rejectBurn(form) {
  //   this.loadToken();
  //   let headers = new HttpHeaders({ 'Authorization': this.authToken });

  //   return this.http.post(`${this.serverUrl}/users/burn-cancel`, form, { headers: headers })

  // }

  //getting list of all exchangers to show in user buy form in dropdown
  exchangerList() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });


    return this.http.get(`${this.serverUrl}/users/exchangers`, { headers: headers })
  }
  //this function will receive an exchanger email and send it to server
  //and the res is exchanger details to show to user
  getExchanger(email) {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });


    return this.http.post(`${this.serverUrl}/users/exchanger`, email, { headers: headers })
  }


}