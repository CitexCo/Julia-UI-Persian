import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AdminsService } from "../../../../services/admins.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material';
import {MatPaginator, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAdminComponent implements OnInit {
  displayedColumns: string[] = ['lastName','firstName',  'email'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource;
  public addAdminForm: FormGroup;
  ax;
  photo;
  roles=[];
  success=false;
  err=false;
  msg;
  router;
  noAccess;
  public details: any = {};
  constructor(public Router:Router, private adminService: AdminsService, private formBuilder: FormBuilder, private flashMessage: FlashMessagesService) {
    this.router = Router;
    //making add admin form
    this.addAdminForm = this.formBuilder.group({
      'email': ['',Validators.compose([Validators.required, CustomValidators.email])],
      'firstname': ['',Validators.required],
      'lastname': ['',Validators.required],
      'img': ['',Validators.required],
      'roles':['']
    });

    //calling listAdmins function from adminService and getting list of created admins
    this.adminService.listAdmins().subscribe(data=>{
      // //console.log(data);
      let admins = data['admins'];
      let msg = data['msg'];
      if (msg == "شما دسترسی به این بخش را ندارید") {
        this.noAccess = true;
      }
      // //console.log(admins);
      
      this.dataSource = new MatTableDataSource(admins);
      this.dataSource.paginator = this.paginator;
    })
   }

  ngOnInit() {
  }
  //adding name of roles that we want our admin having 
  onClick(evnt){
    this.roles.push(evnt.target.value)
    
  }
  //back to add admin page
  goback(){
    this.router.navigate(['pages/addAdmin']);
  }

  submit(){
    //adding values of form to a object
    this.details.firstName = this.addAdminForm.value.firstname;
    this.details.lastName = this.addAdminForm.value.lastname;
    this.details.email = this.addAdminForm.value.email;
    this.details.roles = this.roles;
    this.details.image = this.ax;
    //sending that object contains all of values to registerAdmin function in adminService
    this.adminService.registerAdmin(this.details).subscribe(data=>{
      // //console.log(data);
      this.msg = data['msg'];
      let success = data['success'];
      if (success) {
        this.success = true;
      }
      if (!success) {
        this.err = true;
      }
      
    })
    

  }
  //image validation
  PersonImage(event) {
    let fileType = event.target.files[0].type;
    let fileSize = event.target.files[0].size;
        // //console.log(fileType);


        //if its not png , jpg , jpeg 
    if (fileType !='image/png') {
        if (fileType !='image/jpg') {
            if (fileType != 'image/jpeg') {
                // document.getElementById('secondForm').reset();
                // document.getElementById('imginput').value =''

                // //console.log(event.target.files[0]);
            }


        }

    }if(fileSize > 1000000){
        // document.getElementById('secondForm').reset();
        // event.target.files[0]='';


    }
    else{
        // //console.log(event.target.files[0]);
        this.ax =event.target.files[0];

        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onload = () => {
            this.photo = reader.result;
        }
        reader.readAsDataURL(file);  

    }
    

}

}
