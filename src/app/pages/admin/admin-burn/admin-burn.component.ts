import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../../services/auth-service.service";
import { AdminsService } from "../../../services/admins.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {MatPaginator, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-admin-burn',
  templateUrl: './admin-burn.component.html',
  styleUrls: ['./admin-burn.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminBurnComponent implements OnInit {
  displayedColumns: string[] = ['status', 'submitDate', 'amount', 'tokenPrice','userEmail','reqNum'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  pndingBurnDataSource;
  approvedBurnDataSource;
  rejectedBurnDataSource;
  pendingBurns;
  approvedBurns;
  rejectedBurns;
  noPending;
  noApproved;
  noReject;
  public approveForm: FormGroup;
  public rejectForm: FormGroup;
  reciptNum;
  public details: any = {};
  Msg;
  success;
  err;
  noAccess;
  constructor(router: Router, private authService: AuthService,private adminsService: AdminsService, private fb: FormBuilder, private flashMessage: FlashMessagesService) { 

    //getting list of all pending Burn requests 
    this.adminsService.lisPendingBurn().subscribe(data=>{
      // //console.log(data);
      let msg = data['msg'];
      if (msg == "شما دسترسی به این بخش را ندارید") {
        this.noAccess = true;
      }
      this.pendingBurns = data['burnRequests'];
      this.pndingBurnDataSource = new MatTableDataSource(this.pendingBurns);
      this.pndingBurnDataSource.paginator = this.paginator;
      if (this.pendingBurns.length==0) {
        this.noPending = true;
      }
      this.pendingBurns.forEach(i => {

        i.userSubmitDate= moment(i.userSubmitDate).format('MM/DD/YYYY');
    });
    });
        //getting list of all approved Burn requests 
    this.adminsService.listApprovedBurn().subscribe(data=>{
      // //console.log(data);
      
      this.approvedBurns = data['burnRequests'];
      this.approvedBurnDataSource = new MatTableDataSource(this.approvedBurns);
      this.approvedBurnDataSource.paginator = this.paginator;
      if (this.pendingBurns.length==0) {
        this.noApproved = true;
      }
      this.approvedBurns.forEach(i => {

        i.userSubmitDate= moment(i.userSubmitDate).format('MM/DD/YYYY');
    });
    });
        //getting list of all rejected Burn requests 
    this.adminsService.listRejectedBurn().subscribe(data=>{
      // //console.log(data);
      
      this.rejectedBurns = data['burnRequests'];
      this.rejectedBurnDataSource = new MatTableDataSource(this.rejectedBurns);
      this.rejectedBurnDataSource.paginator = this.paginator;
      if (this.rejectedBurns.length==0) {
        this.noReject = true;
      }
      this.rejectedBurns.forEach(i => {

        i.userSubmitDate= moment(i.userSubmitDate).format('MM/DD/YYYY');
    });
    });
    //making approve form
    this.approveForm =fb.group({
      'comment': [''],

    });
        //making reject form
    this.rejectForm =fb.group({
      'comment': ['',Validators.required],

    });
  }
  //getting recipt number
  getNum(num){
    this.reciptNum = num;
    
  }

  //approving request function
  approve(){
    this.details.comment =this.approveForm.controls['comment'].value;
    this.details.burnRequestNumber = this.reciptNum;
    this.adminsService.approveBurn(this.details).subscribe(data=>{
      // //console.log(data);
      
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
  //rejecting request function
  reject(){
    // //console.log(this.reciptNum);
    this.details.comment =this.rejectForm.controls['comment'].value;

    this.details.burnRequestNumber = this.reciptNum;
    if (this.rejectForm.valid) {
      // //console.log('valiiiid');
      
      this.adminsService.rejectBurn(this.details).subscribe(data=>{
        // //console.log(data);
        
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

      
    }

    
  }
  ngOnInit() {
  }

}
