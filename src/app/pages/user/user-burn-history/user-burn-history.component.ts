import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AuthService } from "../../../services/auth-service.service";
import * as moment from 'moment';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-burn-history',
  templateUrl: './user-burn-history.component.html',
  styleUrls: ['./user-burn-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserBurnHistoryComponent implements OnInit {
  allBurnRequests;
  allTransferRequests;
  displayedColumns: string[] = ['comment','submitDate', 'amount', 'status', 'tokenPrice', 'reqNum'];
  user
  notVerified
  @ViewChild(MatPaginator) paginator: MatPaginator;
  BurnDataSource;
  TransferDataSource;
  constructor(private authService: AuthService, ) {
    //getting details of loggeding user to check that if kyc verified or not
    this.authService.getProfile().subscribe(data => {
      let user = data['user'];
      this.user = data['user'];

      if (!user.KYCVerified) {
        this.notVerified = true
      }
    })
     //getting list of all burn Requests that user have
    this.authService.listAllBurn().subscribe(data => {


      this.allBurnRequests = data['burnRequest'];
      console.log(data);
      this.BurnDataSource = new MatTableDataSource(this.allBurnRequests);
      this.BurnDataSource.paginator = this.paginator;


      this.allBurnRequests.forEach(i => {

        i.userSubmitDate = moment(i.userSubmitDate).format('MM/DD/YYYY');
      });

    });
    //getting list of all trasnfer Requests that user have
    this.authService.listAllTransfer().subscribe(data => {


      this.allTransferRequests = data['transferRequest'];
      //console.log(data);
      this.TransferDataSource = new MatTableDataSource(this.allTransferRequests);
      this.TransferDataSource.paginator = this.paginator;


      this.allTransferRequests.forEach(i => {

        i.userSubmitDate = moment(i.userSubmitDate).format('MM/DD/YYYY');
      });

    });
  }

  ngOnInit() {
  }



}
