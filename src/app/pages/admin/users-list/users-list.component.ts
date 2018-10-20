import { Component, OnInit, ViewEncapsulation ,ViewChild} from '@angular/core';
import { AuthService } from "../../../services/auth-service.service";
import { AdminsService } from "../../../services/admins.service";
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl} from '@angular/forms';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import * as moment from 'moment';
import { ImgService } from "./../../../services/img.service";
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['activity', 'msg', 'kyc', 'email'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource;
  public users=[];
  temp = [];
  selectedEmail;
  selectedUserForActivity;
  address;
  email;
  firstName;
  lastname;
  passImg;
  telephone;
  walletAddress;
  birthDate;
  KYCUpdated;
  KYCVerified;
  Msg;
  success;
  err;

  public form:FormGroup;
  public disable:AbstractControl;
  public enable:AbstractControl;
  constructor(private fb: FormBuilder,private authService:AuthService, public adminService:AdminsService, public imageService:ImgService) {
    this.form = fb.group({
      disable: [false],
      enable: [false],
  });
   }

  ngOnInit() {
    //getting list of users
    this.adminService.getUserList().subscribe(data => {
      let users = data['users'];

      users.forEach(user => {
        this.users.push(user.email);
        this.temp.push(user.email)
      });

      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      //console.log(this.users);
      
    });
  }
  onSearchChange(searchValue : string){
    let val = searchValue.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.users = temp;
    //console.log(temp);
    
  }

  getKyc(email){
    //console.log(email);
    this.selectedEmail = email;
    //send selected user email to getKyc function in adminService and return details of that user
    this.adminService.getKyc({'email':email}).subscribe(data=>{
      //console.log(data);
      
    let user= data["user"];
    this.KYCUpdated = user.KYCUpdated;
    this.KYCVerified = user.KYCVerified;
    this.address = user.address;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastname = user.lastName;
    this.passImg = user.passportImageAddress;
    this.telephone = user.telephone;
    this.walletAddress = user.walletAddress;
    this.birthDate = user.birthDate;
      // //console.log(user.email);
      
    });
    
  }

  activity(email){
    this.selectedUserForActivity = email;
    //console.log(email);
    
  }
  // activing user
  active(){
    this.adminService.activeUser({"email":this.selectedUserForActivity}).subscribe(data=>{
      //console.log(data);

      let msg = data['msg'];
      this.Msg = msg;
      let success = data['success'];
      if(success) {

        this.success = true;

      } else {

        this.err = true;
        setTimeout(() => {
          location.reload()
      }, 3000); 
      }
    });
  }
  reload(){
  //console.log('reload');
  
  location.reload();
}
//deactiving user
  deactive(){
    this.adminService.deactiveUser({"email":this.selectedUserForActivity}).subscribe(data=>{
      //console.log(data);

      let msg = data['msg'];
      this.Msg = msg;
      let success = data['success'];
      if(success) {

        this.success = true;
        setTimeout(() => {
          location.reload()
      }, 3000);
      } else {

        this.err = true;
        setTimeout(() => {
          location.reload()
      }, 3000); 
      }
    });
  }

}
