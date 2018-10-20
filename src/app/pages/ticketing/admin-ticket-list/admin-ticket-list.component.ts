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
    this.ticketService.listAdmin()
    this.router = router;
    this.form = fb.group({
      answerDesc: [''],
  });
  this.answerDesc = this.form.controls['answerDesc'];
   }

  ngOnInit() {

    
    this.current = this.ticketService.GetCurrentTicket();
    //console.log(this.current);
    
    this.ticketService.listAdmin().subscribe(data=>{
      let tickets = data['tickets'];
     //console.log(data);
     tickets.forEach(ticket => {
       this.ticketsArr.push(ticket);
     });
     this.ticketsArr.forEach(i => {
       if (i.ticketNumber == this.current) {
         //console.log(i);
         this.replys = i.replys;
         this.description = i.description;
         this.attachmentAddress = i.attachmentAddress;
       }
     });
     //console.log(this.replys);
     
   })
    
  }

  public onSubmit(values:Object) {
    values['ticketNumber'] = this.current
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
