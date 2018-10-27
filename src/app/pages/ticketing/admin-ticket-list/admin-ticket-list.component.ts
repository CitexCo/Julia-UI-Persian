import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TicketService } from "../../../services/ticket.service";
import { Router ,ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-admin-ticket-list',
  templateUrl: './admin-ticket-list.component.html',
  styleUrls: ['./admin-ticket-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminTicketListComponent implements OnInit {
  public router: Router;
  public form:FormGroup;
  public answerDesc:AbstractControl;
   current;
   ticketsArr=[];
   replys;
   description;
   attachmentAddress;
  constructor(private activatedRoute: ActivatedRoute,router:Router, private ticketService: TicketService,fb:FormBuilder,private flashMessage: FlashMessagesService) {

    this.router = router;
    this.form = fb.group({
      answerDesc: [''],
  });
  this.answerDesc = this.form.controls['answerDesc'];
   }

  ngOnInit() {

    // getting current ticket number by callling GetCurrentTicket function in ticketService
    this.current = this.ticketService.GetCurrentTicket();
    //console.log(this.current);
    //getting all of admins tickets and set it to tickets varibles
    this.ticketService.listAdminTicket().subscribe(data=>{
      let tickets = data['tickets'];
     //console.log(data);
    //  pushing all tickets in tickets array
     tickets.forEach(ticket => {
       this.ticketsArr.push(ticket);
     });
    //  check which ticket number is matches with that number we got in current varible
     this.ticketsArr.forEach(i => {
       if (i.ticketNumber == this.current) {
         //console.log(i);
        //  if any matches found then get information of that ticket and set it to our global varibles
         this.replys = i.replys;
         this.description = i.description;
         this.attachmentAddress = i.attachmentAddress;
       }
     });
     //console.log(this.replys);
     
   })
    
  }

  public onSubmit(values:Object) {
    values['ticketNumber'] = this.current;
    // send answers to answer function in ticketService
    this.ticketService.answer(values).subscribe(data=>{
      let success = data['success'];
      let msg = data['msg'];
      if(success) {
        this.flashMessage.show(msg, {cssClass: 'alert-success', timeout: 6000});
        this.router.navigate(['pages/ticketing/AdminTicket']);
      } else {
        this.flashMessage.show(msg, {cssClass: 'alert-danger', timeout: 5000});

      }
      
    })
    
  }

}
