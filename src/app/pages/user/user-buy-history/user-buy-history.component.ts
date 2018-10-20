import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { AuthService } from "../../../services/auth-service.service";
import { ExchangerService } from "../../../services/exchanger.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {MatPaginator, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-user-buy-history',
  templateUrl: './user-buy-history.component.html',
  styleUrls: ['./user-buy-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserBuyHistoryComponent implements OnInit {
  displayedColumns: string[] = ['exchanger', 'amount', 'expire', 'code','status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource;
  exchangers=[];
  constructor(router: Router, private authService: AuthService,private exchangerService: ExchangerService) {
    this.authService.listReceipt().subscribe(data=>{
      //console.log(data);
      let Recipts = data['receipts'];
      //console.log(Recipts);
      
      this.dataSource = new MatTableDataSource(Recipts);
      this.dataSource.paginator = this.paginator;
      
      
    })

   }

  ngOnInit() {
  }

}
