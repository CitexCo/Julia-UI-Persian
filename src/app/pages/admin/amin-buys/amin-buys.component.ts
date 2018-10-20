import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../../services/auth-service.service";
import { AdminsService } from "../../../services/admins.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { ImgService } from "../../../services/img.service";
@Component({
  selector: 'app-amin-buys',
  templateUrl: './amin-buys.component.html',
  styleUrls: ['./amin-buys.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AminBuysComponent implements OnInit {
  router;
  displayedColumns: string[] = ['exchanger',  'user','amount', 'status','details'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  PendingDataSource;
  pendingRecipts;
  approvedReceipts;
  rejectedReceipts;
  userImg;
  exchangerImg;
  reciptNum;
  Msg;
  success;
  err;
  noPending=false;
  noApproved=false;
  btndisable=true;
  noRejected=false;
  seeMore=false;
  //
  selectedRecipt;
  exchangerEmail;
  userEmail;
  exchangerSubmitDate;
  userSubmitDate;
  amount;
  userDoc;
  exchangerDoc;
  userComment;
  exchangerComment;
  //
  haveUserReceipt;
  haveExchangerReceipt;
  noAccess;
  public approveForm: FormGroup;
  public rejectForm: FormGroup;
  public details: any = {};
  constructor(router: Router, private authService: AuthService,private adminsService: AdminsService, private fb: FormBuilder, private imgService: ImgService) {
    this.router = router;

    this.approveForm =fb.group({
      'comment': [''],

    });
    this.rejectForm =fb.group({
      'comment': ['',Validators.required],

    });
   }
   

  ngOnInit() {
    //getting all pending Buy requests
    this.adminsService.ListPending().subscribe(data=>{

      this.pendingRecipts = data['receipts'];
      let pendingRecipts =  data['receipts'];
      this.PendingDataSource = new MatTableDataSource(pendingRecipts);
      this.PendingDataSource.paginator = this.paginator;
      //console.log(data);
      let msg = data['msg'];
      if (msg == "شما دسترسی به این بخش را ندارید") {
        this.noAccess = true;
      }
      if (this.pendingRecipts.length==0) {
        this.noPending = true;
      }
      this.userImg = this.pendingRecipts.exchangerReceipt
      this.exchangerImg = data['userReceipt']
    //   this.pendingRecipts.forEach(i => {
    //     //console.log(i.exchangerSubmitDate);
        
    //     i.exchangerSubmitDate= moment(i.exchangerSubmitDate).format('MM/DD/YYYY');
      
    // });

    });
        //getting all approved Buy requests
    this.adminsService.ListApproved().subscribe(data=>{

      this.approvedReceipts = data['receipts'];
      //console.log(this.approvedReceipts);
      
      
      if (this.approvedReceipts.length==0) {
        this.noApproved = true;
      }
      this.userImg = this.pendingRecipts.exchangerReceipt
      this.approvedReceipts.forEach(i => {
        //console.log(i.exchangerSubmitDate);
        
        i.exchangerSubmitDate= moment(i.exchangerSubmitDate).format('MM/DD/YYYY');
    });
      
    });
        //getting all rejected Buy requests
    this.adminsService.ListRejected().subscribe(data=>{

      this.rejectedReceipts = data['receipts'];
      //console.log(this.rejectedReceipts);
      
      
      if (this.rejectedReceipts.length==0) {
        this.noRejected = true;
      }

      this.rejectedReceipts.forEach(i => {
        //console.log(i.exchangerSubmitDate);
        
        i.exchangerSubmitDate= moment(i.exchangerSubmitDate).format('MM/DD/YYYY');
    });
      
    });
  }
  backtoList(){
    this.seeMore = false;
  }
  //in this function we Comparison selected recipt Number with all recipts in pending list
  //if one of them matches with selected reciept Number then set values of that recipt to global varibles
  getNum(num){
    this.reciptNum = num;
    this.pendingRecipts.forEach(element => {
      if (element.receiptNumber == num) {
        this.selectedRecipt = element;
        this.exchangerEmail = this.selectedRecipt.exchangerEmail;
        this.userEmail = this.selectedRecipt.userEmail;
        this.exchangerSubmitDate = this.selectedRecipt.exchangerSubmitDate;
        this.userSubmitDate = this.selectedRecipt.userSubmitDate;
        this.amount = this.selectedRecipt.amount;
        this.userDoc = this.selectedRecipt.userReceipt;
        this.exchangerDoc = this.selectedRecipt.exchangerReceipt;
        this.userComment= this.selectedRecipt.userComment;
        this.exchangerComment= this.selectedRecipt.exchangerComment;
      }
    });

    this.setSeeMore();
  }
  setSeeMore(){
    this.seeMore = true;
    
    if (!this.selectedRecipt.userReceipt) {
      
      this.haveUserReceipt = false;
    }
    if (this.selectedRecipt.userReceipt) {
      
      this.haveUserReceipt = true;
    }
    if (!this.selectedRecipt.exchangerReceipt) {
      this.haveExchangerReceipt = false;
    }
    if (this.selectedRecipt.exchangerReceipt) {
      
      this.haveExchangerReceipt = true;
    }
  }
  //approve buy request by admin
  approve(){
    this.details.comment =this.approveForm.controls['comment'].value;
    this.details.receiptNumber = this.reciptNum;
    this.adminsService.approveReceipt(this.details).subscribe(data=>{
      //console.log(data);
      
      this.Msg = data['msg'];
      let success = data['success'];

      if(success) {
        this.err = false;
        this.success = true;
        setTimeout(() => {
          location.reload()
      }, 3000);
      } if(!success) {
        this.success = false;
        this.err = true;
        setTimeout(() => {
          location.reload()
      }, 3000); 
      }
      
    })
    
  }
  reload(){
                location.reload()
  }
    //reject buy request by admin
  reject(){
    this.details.comment =this.rejectForm.controls['comment'].value;

    this.details.receiptNumber = this.reciptNum;
    if (this.rejectForm.valid) {
      
      
      this.adminsService.rejectReceipt(this.details).subscribe(data=>{
        //console.log(data);
        
        this.Msg = data['msg'];
        let success = data['success'];
  
        if(success) {
          this.err = false;
          this.success = true;
          setTimeout(() => {
            location.reload()
        }, 3000);
        } if(!success) {
          this.success = false;
          this.err = true;
          setTimeout(() => {
            location.reload()
        }, 3000); 
        }
        
      })   
    } else{
      //console.log('not valiiiid');
      
    }

    
  }
}
