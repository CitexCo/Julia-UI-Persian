import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '../../../../../node_modules/@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TicketService } from "../../../services/ticket.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import * as moment from 'moment';
@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserTicketComponent implements OnInit {
  displayedColumns: string[] = ['ticketNumber', 'replyDate', 'subject', 'status','tokenType','conversation'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource;
  public router: Router;
  public form: FormGroup;
  public subject: AbstractControl;
  public description: AbstractControl;
  public tokenType: AbstractControl;
  public recieveEmail: AbstractControl;
  public photo: any;
  fileName
  successTicket:boolean=false;
  acceptMail;
  ticketsArr=[];
   ticketNum;
   fileExtension: any;
   fileExtensionMessage: any;
   fileExtensionError: boolean ;
   haveImg:boolean=true;
   ax: AbstractControl;;
  constructor(router: Router, private activatedRoute: ActivatedRoute,
    fb: FormBuilder,
    private ticketService: TicketService,
    private flashMessage: FlashMessagesService) {
      
    this.router = router;

    this.form = fb.group({
      subject: ['', Validators.required],
      description: ['', Validators.required],
      tokenType: ['', Validators.required],
      recieveEmail: [false],

    });
    this.subject = this.form.controls['subject'];
    this.description = this.form.controls['description'];
    this.tokenType = this.form.controls['tokenType'];
    this.recieveEmail = this.form.controls['recieveEmail'];
    this.ax = this.form.controls['image'];


this.ticketService.listmy()


  }
  getData(){

  }
  ngOnInit() {
    //getting list of all tickets
    this.ticketService.listmy().subscribe(data=>{

      //console.log(data);
      let tickets = data['tickets'];
      tickets.forEach(i => {

        i.lastReplyDate= moment(i.lastReplyDate).format('MM/DD/YYYY');
    });
      this.dataSource = new MatTableDataSource(tickets);
      this.dataSource.paginator = this.paginator;
      tickets.forEach(ticket => {
        this.ticketsArr.push(ticket);
      });

      this.ticketsArr.forEach(ticket=>{
        if (ticket.status == 'Closed') {
          //console.log(ticket);
          
        }
      })
    })
  }
  public onSubmit(values: Object) {
    values['file'] = this.ax;
    //console.log(values);
    
    this.ticketService.create(values)
    .subscribe(data => {
      //console.log(data);
      
      let success = data['success'];
      if(success) {

        this.successTicket = true;
        setTimeout(() => {
          this.router.navigate(['/pages/ticketing/UserTicket']);
          location.reload();
      }, 2000); 
      } else {


      }
    });
  }

  ShowTicket(ticketnum) {

    this.ticketNum = ticketnum;
    this.ticketService.currentTicket(ticketnum);
    this.router.navigate(['/pages/ticketing/TicketList']);
  }
  State() {
    this.router.navigate(['/pages/ticketing/TicketState']);
  }
  image(event) {
    let fileType = event.target.files[0].type;
    let fileSize = event.target.files[0].size;
    this.fileName =event.target.files[0].name;
        //console.log(fileType);
    //input file validation
    if (fileType !='image/png' && fileType !='image/jpg'&&fileType != 'image/jpeg' && fileType != 'application/pdf'&& fileType != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ) {

    

                this.fileExtensionError = true;
                this.fileExtensionMessage='';
                this.fileExtensionMessage='فایل غیر مجاز است';
                //console.log(event.target.files[0]);
                //console.log(this.fileExtensionError);
                
                this.ax = null;
                this.photo = null;
                this.fileName = null;
            

        

    }
    else if(fileSize > 1000000){
        // document.getElementById('secondForm').reset();
        // event.target.files[0]='';

        this.fileExtensionError = true;
        this.fileExtensionMessage='';
        this.fileExtensionMessage='حداکثر حجم مورد قبول 1 مگابایت';
        this.ax = null;
        this.photo = null;
        this.fileName = null;
    }
    else{
        this.ax =event.target.files[0];
        this.fileExtensionError = false;
        this.fileExtensionMessage='';
        this.haveImg=true;
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onload = () => {
            this.photo = reader.result;
        }
        reader.readAsDataURL(file);  

    }
    

}
}
