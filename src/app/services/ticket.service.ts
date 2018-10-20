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
   serverUrl:string = environment.serverUrl;
  constructor(private authService:AuthService,private http: HttpClient) { }

  create(ticket){
    //console.log(ticket);
    
        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);

    let body = new FormData();
    body.append('subject', ticket.subject);
    body.append('description', ticket.description);
    body.append('tokenType', ticket.tokenType);
    body.append('recieveEmail', ticket.recieveEmail);
    body.append('attachment', ticket.file);
    //console.log(body);
    
    return this.http.post(`${this.serverUrl}/tickets/create`, body, { headers: headers })
      ////.map(res => res.json());
  }
  listmy(){
        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get(`${this.serverUrl}/tickets/listmy`, { headers: headers });
      //.map(res => res.json());
  }
  currentTicket(num){
    this.ticketNum = num;
    
  }
  GetCurrentTicket(){
    return this.ticketNum;
  }
  reply(values){
        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post(`${this.serverUrl}/tickets/reply`,values, { headers: headers })
      //.map(res => res.json());
  }
  listAdmin(){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get(`${this.serverUrl}/tickets/listall`, { headers: headers })
      //.map(res => res.json());
  }
  answer(values){
        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post(`${this.serverUrl}/tickets/answer`,values, { headers: headers })
      //.map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;

    
  }
  cancel(ticketNumber){

        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post(`${this.serverUrl}/tickets/cancel`,ticketNumber, { headers: headers })
  }
  resolve(ticketNumber){
    let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post(`${this.serverUrl}/tickets/resolve`,ticketNumber, { headers: headers })
  }
}