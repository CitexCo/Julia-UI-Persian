import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from "./auth-service.service";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from "./../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  authToken: any;
  ticketNum;
  serverUrl: string = environment.serverUrl;
  constructor(private authService: AuthService, private http: HttpClient) { }
  //create New Ticket
  //used in user-ticket.component.ts
  create(ticket) {
    //the ticket this function will receive should have this values: subject - description - tokenType - recieveEmail - attachment(optional)
    //becuse this function gonna send photos to server so we used Form data to attach images to body request
    let headers = new HttpHeaders({ 'Authorization': this.authToken });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let body = new FormData();
    body.append('subject', ticket.subject);
    body.append('description', ticket.description);
    body.append('tokenType', ticket.tokenType);
    body.append('recieveEmail', ticket.recieveEmail);
    body.append('attachment', ticket.file);


    return this.http.post(`${this.serverUrl}/tickets/create`, body, { headers: headers })

  }

  //list all of user tickets
  //called in user-ticket.component.ts to show all of user ticket
  listmy() {
    let headers = new HttpHeaders({ 'Authorization': this.authToken });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get(`${this.serverUrl}/tickets/listmy`, { headers: headers });
    //.map(res => res.json());
  }

  //this function will receive the selected ticket number and set the number to ticketNum variable
  //used both in ticket-list.component and admin-ticket-list.component
  currentTicket(num) {
    this.ticketNum = num;
  }
  //this one will return the saved ticket number in ticketNum variable
  //used both in ticket-list.component and admin-ticket-list.component
  GetCurrentTicket() {
    return this.ticketNum;
  }
  //send replay to an ticket
    //used both in ticket-list.component and admin-ticket-list.component
  reply(values) {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    headers.append('Authorization', this.authToken);
    return this.http.post(`${this.serverUrl}/tickets/reply`, values, { headers: headers })
    //.map(res => res.json());
  }
  //get list all of admin's received tickets
  //this function is called in and admin-ticket-list.component
  listAdminTicket() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });

    headers.append('Authorization', this.authToken);
    return this.http.get(`${this.serverUrl}/tickets/listall`, { headers: headers })
    //.map(res => res.json());
  }
  //answer to a ticket by admin
    //this function is called in and admin-ticket-list.component
  answer(values) {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });

    headers.append('Authorization', this.authToken);
    return this.http.post(`${this.serverUrl}/tickets/answer`, values, { headers: headers })
    //.map(res => res.json());
  }
  //this function will get JWT token that saved in localStorage and set it to authToken variable
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  // cancel sent ticket by user
  cancel(ticketNumber) {

    let headers = new HttpHeaders({ 'Authorization': this.authToken });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post(`${this.serverUrl}/tickets/cancel`, ticketNumber, { headers: headers })
  }
  //change ticket status to resolved by user
  resolve(ticketNumber) {
    let headers = new HttpHeaders({ 'Authorization': this.authToken });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post(`${this.serverUrl}/tickets/resolve`, ticketNumber, { headers: headers })
  }
}