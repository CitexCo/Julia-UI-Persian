import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { environment } from "./../../environments/environment";
import { UserInfo, UserReceipt } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class ExchangerService {
    authToken: any;
    serverUrl:string = environment.serverUrl
    constructor(private http: HttpClient) { 
    }

    //creat new receipt for user
    createUserReceipt(r): UserReceipt {
        
        let receipt: UserReceipt =
        {
            status: r.status ? r.status : '',
            exchanger: r.exchanger ? r.exchanger : '',
            exchangerEmail: r.exchangerEmail ? r.exchangerEmail : '',
            amount: r.amount ? r.amount : '',
            user: r.user ? r.user : '',
            userEmail: r.userEmail ? r.userEmail : '',
            verificationCode: r.verificationCode ? r.verificationCode : '',
            codeExpiration: r.codeExpiration ? moment(r.codeExpiration).format('MMMM DD YYYY') : '',
            receiptNumber: r.receiptNumber ? r.receiptNumber : '',
            adminComment: r.adminComment ? r.adminComment : '',
            adminSubmitDate: r.adminSubmitDate ? moment(r.adminSubmitDate).format('MMMM Do YYYY, h:mm:ss a') : '',
            exchangerComment: r.exchangerComment ? r.exchangerComment : '',
            exchangerSubmitDate: r.exchangerSubmitDate ? moment(r.exchangerSubmitDate).format('MMMM Do YYYY, h:mm:ss a') : '',
            userComment: r.userComment ? r.userComment : '',
            userSubmitDate: r.userSubmitDate ? moment(r.userSubmitDate).format('MMMM Do YYYY, h:mm:ss a') : '',
        }

        return receipt
    }
    //load JWT token for Authorization
    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }
    //getting kyc information for user
    getKyc(userNumber){
        
        this.loadToken();
        let headers = new HttpHeaders({ 'Authorization' : this.authToken });
        
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
    
        return this.http.post(`${this.serverUrl}/exchangers/get-kyc`, { "userNumber": userNumber}, { headers: headers })
    }
    //get user email from component and send to server and getting user info
    getUser(userEmail) {

        this.loadToken();
        let headers = new HttpHeaders({'Authorization' : this.authToken});
        
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
    
        return this.http.post(`${this.serverUrl}/exchangers/get-user`, {"userEmail":userEmail}, { headers: headers })
        .map(c => {
            let user: UserInfo = c['user']
            
            return user
        })
    }
    //geting receipt information from component
    //because it should send images so we send request as form Data
    receipt(form) {

        this.loadToken();
        let headers = new HttpHeaders({ 'Authorization' : this.authToken });
        headers.append('Authorization', this.authToken);
        // headers.append('Content-Type', 'multipart/form-data');

        let body = new FormData();
        // body.append('email', form.email);
        body.append('receipt', form.receipt);
        body.append('exchangerComment', form.comment);
        body.append('amount', form.amount);
        body.append('userNumber', form.userNumber);

        return this.http.post(`${this.serverUrl}/exchangers/receipt`, body, { headers: headers })
        
    }
    //send verification Code to server to find specific receipt and return
    getReceiptByCode(verificationCode) {
        this.loadToken();
        let headers = new HttpHeaders({ 'Authorization' : this.authToken });
        
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
    
        return this.http.post(`${this.serverUrl}/exchangers/search-receipt`, 
        { verificationCode: verificationCode },
        { headers: headers })
        .map(resp => {
            let receipt
            if (resp['success']) {
                receipt = this.createUserReceipt(resp['receipt'])
            } else {
                receipt = null
            }
            return receipt
        })
    }
    //getting list of all receipts
    getList() {

        this.loadToken();
        let headers = new HttpHeaders({ 'Authorization' : this.authToken });
        
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
    
        return this.http.get(`${this.serverUrl}/exchangers/list-receipt`, { headers: headers })
        .map(resp => {
            let receipts = resp['receipts']
            
            let rcpt = receipts.map(r => {              
                return this.createUserReceipt(r)
            })
            return rcpt
        })
    }
    //getting list of all pending receipts
    getPendingList() {

        this.loadToken();
        let headers = new HttpHeaders({ 'Authorization' : this.authToken });
        
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
    
        return this.http.get(`${this.serverUrl}/exchangers/list-pending-receipt`, { headers: headers })
        .map(resp => {
            let receipts = resp['receipts']
            receipts = receipts.map(r => {
                return this.createUserReceipt(r)
            })
            return receipts
        })
        
    }
    //compelet confirm receipt procces 
    confirmReceipt(receipt) {
        this.loadToken();
        let headers = new HttpHeaders({ 'Authorization' : this.authToken });
        
        let body = new FormData()
        body.append('receiptNumber', receipt.receiptNumber)
        body.append('comment', receipt.comment)
        body.append('receipt', receipt.receipt)

        return this.http.post(`${this.serverUrl}/exchangers/complete-receipt`, 
        body,
        { headers: headers })
        // .map(c => {
        //     let users: UserReceipt[] = c['receipts']
        //     return users
        // })
    }

}
