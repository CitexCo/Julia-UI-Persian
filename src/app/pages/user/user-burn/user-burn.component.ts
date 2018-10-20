import { Component, OnInit, ViewEncapsulation ,ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../../services/auth-service.service";
import { ExchangerService } from "../../../services/exchanger.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { RpcService } from "./../../../services/rpc.service";
 
@Component({
  selector: 'app-user-burn',
  templateUrl: './user-burn.component.html',
  styleUrls: ['./user-burn.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserBurnComponent implements OnInit {
  displayedColumns: string[] = ['submitDate', 'amount', 'status', 'tokenPrice','reqNum'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  BurnDataSource;
  TransferDataSource;
  public burnForm: FormGroup;
  public tranferForm:FormGroup;
  public confirmForm: FormGroup;
  public rejectForm : FormGroup;
  public details: any = {};
  Msg;
  notSuccess=false;
  noBurnSuccess=false;
  BurnSuccess=false;
  success =false;
  PendingBurnRequests;
  PendingTransferRequests;
  burnReqNumber;
  confirmed = false;
  resend=false;
  noresend=false;
  balance;
  err;
  hasWallet;
  router;
  user;
  notVerified;
  lastPrice;
  selectedPrice;
  constructor(router: Router,public RpcService:RpcService ,private authService: AuthService,private exchangerService: ExchangerService, private formBuilder: FormBuilder, private flashMessage: FlashMessagesService) { 
    this.router = router;
    //getting details of loggeding user to check that if kyc verified and if verified user submited wallet addres or not
    this.authService.getProfile().subscribe(data=>{
      let user= data['user'];
      this.user = data['user'];
      this.hasWallet = user.hasWallet;
      if (!user.KYCVerified) {
        this.notVerified = true
      }
    });
    //getting last price of token
    this.RpcService.getLastPrice().subscribe(data=>{
      this.lastPrice = data ['price']
      
    });
    this.burnForm = this.formBuilder.group({
      'amount':['',Validators.required],
      'password':['',Validators.required]
    });
    this.tranferForm = this.formBuilder.group({
      'amount':['',Validators.required],
      'password':['',Validators.required]
    });
    this.confirmForm = this.formBuilder.group({
      'code':['',Validators.required],
    });
    this.rejectForm =formBuilder.group({
      'comment': ['',Validators.required],

    });
    //getting list of pending burn Requests that user have
    this.authService.listPendingBurn().subscribe(data=>{
      this.PendingBurnRequests = data['burnRequests'];
      this.BurnDataSource = new MatTableDataSource(this.PendingBurnRequests);
      this.BurnDataSource.paginator = this.paginator;
      this.PendingBurnRequests.forEach(i => {

        i.userSubmitDate= moment(i.userSubmitDate).format('MM/DD/YYYY');
    });
    });
        //getting list of pending trasnfer Requests that user have
    this.authService.listPendingTransfer().subscribe(data=>{
      //console.log(data);
      
      this.PendingTransferRequests = data['transferRequests'];
      this.TransferDataSource= new MatTableDataSource(this.PendingTransferRequests);
      this.TransferDataSource.paginator = this.paginator;
      this.PendingTransferRequests.forEach(i => {

        i.userSubmitDate= moment(i.userSubmitDate).format('MM/DD/YYYY');
    });
    });
        //getting balance amount that user have
    this.authService.getBalance().subscribe(data=>{
      this.balance = data['balance']

      
    });

  }
  //convert token amount to Rial price
  tokenToRial(val){
    val = val.replace(/\D/g,"")
    //console.log(val);
    
    this.selectedPrice = +val*this.lastPrice.price
  }
  gotoKYC(){
    this.router.navigate(['pages/form-elements/UserKYC']);
    // location.reload()
  }
  ngOnInit() {

  }
  goTicket(){
    this.router.navigate(['/pages/ticketing/UserTicket']);
    location.reload()
  }
  pending(BurnRequestNumber){
    this.burnReqNumber = BurnRequestNumber;
  }
  getNum(num){
    this.burnReqNumber = num;
  }
  resendBurn(number){
    this.details.burnRequestNumber = number;
    
    this.authService.resendConfirmCode(this.details).subscribe(data=>{
      //console.log(data);
      
      this.Msg = data['msg'];
      let success = data['success'];
      if (success) {
        this.resend = true;
        
        setTimeout(() => {
          location.reload()
      }, 5000);
      }
      if (!success) {
        this.noresend = true;
        setTimeout(() => {
          location.reload()
      }, 5000);
      }
    })
  }
  verifyBurn(){
    this.details.burnRequestNumber = this.burnReqNumber;
    this.details.verificationToken = this.confirmForm.controls['code'].value;
    this.authService.verifyBurn(this.details)
    .subscribe(data=>{
      this.Msg = data['msg'];
      let success = data['success'];
      if (success) {
        this.BurnSuccess = true;
        
        setTimeout(() => {
          location.reload()
      }, 5000);
      }
      if (!success) {
        this.noBurnSuccess = true;
        setTimeout(() => {
          location.reload()
      }, 5000);
      }
      
    })
  }
  reject(){
    this.details.comment =this.rejectForm.controls['comment'].value;

    this.details.burnRequestNumber = this.burnReqNumber;
    if (this.rejectForm.valid) {
      //console.log('valiiiid');
      
      this.authService.rejectBurn(this.details).subscribe(data=>{
        //console.log(data);
        
        this.Msg = data['msg'];
        let success = data['success'];
  
        if(success) {
          this.err = false;
          this.success = true;
        //   setTimeout(() => {
        //     location.reload()
        // }, 3000);
        } if(!success) {
          this.success = false;
          this.err = true;
        //   setTimeout(() => {
        //     location.reload()
        // }, 3000); 
        }
        
      })   
    } else{
      //console.log('not valiiiid');
      
    }

    
  }
  burn(){
    if (this.burnForm.valid) {
      this.details.password =this.burnForm.controls['password'].value;
      this.details.amount =this.burnForm.controls['amount'].value;
      this.authService.burn(this.details).subscribe(data=>{
        this.Msg = data['msg'];
       let msg = data['msg'];
        let success = data['success'];
        this.success = data['success'];
        if (success) {
          this.success = true;
          this.flashMessage.show(msg, {cssClass: 'alert-success', timeout: 10000});
          setTimeout(() => {
            this.success = null;
        }, 5000);

        }
        else {
          this.flashMessage.show(msg, {cssClass: 'alert-danger', timeout: 10000});
          this.notSuccess = true;
          setTimeout(() => {
            this.notSuccess = null;
        }, 5000);

        }
        //console.log(data);
        
      })
    }

  }
  transfer(){
    if (this.tranferForm.valid) {
      this.details.password =this.tranferForm.controls['password'].value;
      this.details.amount =this.tranferForm.controls['amount'].value;
      this.authService.transfer(this.details).subscribe(data=>{
        this.Msg = data['msg'];
        let success = data['success'];
        if (success) {
          this.success = true;
          this.flashMessage.show(this.Msg, {cssClass: 'alert-success', timeout: 10000});
          setTimeout(() => {
            location.reload()
        }, 5000);
        }
        if (!success) {
          this.flashMessage.show(this.Msg, {cssClass: 'alert-danger', timeout: 10000});
          this.notSuccess = true;
          setTimeout(() => {
            location.reload()
        }, 5000);
        }
        //console.log(data);
        
      })
    }

  }

}
