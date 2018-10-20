import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { TicketService } from "../../../services/ticket.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import * as moment from 'moment';
@Component({
  selector: 'app-admin-ticket',
  templateUrl: './admin-ticket.component.html',
  styleUrls: ['./admin-ticket.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminTicketComponent implements OnInit {
  displayedColumns: string[] = ['ticketNumber', 'replyDate', 'subject', 'status','tokenType','conversation'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource;
  ticketsArr=[];
  ticketNum;
  public router: Router;
  constructor(router:Router, private ticketService: TicketService,
    private flashMessage: FlashMessagesService) {
      this.ticketService.listAdmin()
    this.router = router;
   }

  ngOnInit() {
    this.ticketService.listAdmin().subscribe(data=>{
      let tickets = data['tickets'];
      //console.log(data);
      tickets.forEach(i => {

        i.lastReplyDate= moment(i.lastReplyDate).format('MM/DD/YYYY');
    });
      this.dataSource = new MatTableDataSource(tickets);
      this.dataSource.paginator = this.paginator;
      tickets.forEach(ticket => {
        this.ticketsArr.push(ticket);
      });
      //console.log(this.ticketsArr);
      
    })
  }
  ShowTicket(ticketnum){
    this.ticketNum = ticketnum;
    this.ticketService.currentTicket(ticketnum);

    this.router.navigate(['/pages/ticketing/AdminTicketList']);
  }
}
