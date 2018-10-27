import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { AuthService } from "../../../services/auth-service.service";
import { AdminsService } from "../../../services/admins.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  AbstractControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { MatPaginator, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-admin-user-list",
  templateUrl: "./admin-user-list.component.html",
  styleUrls: ["./admin-user-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AdminUserListComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  public router: Router;
  editing = {};
  public form: FormGroup;
  public user: AbstractControl;
  public UserManager: AbstractControl;
  public changeRoles: AbstractControl;
  public verifyKYC: AbstractControl;
  public email: AbstractControl;
  public answerTicket: AbstractControl;
  isUser = false;
  isChangeRole = false;
  isUserManager = false;
  isVerifyKYC = false;
  isAnswerTicket = false;
  // rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = false;
  reorderable: boolean = true;
  rows: any = [];
  roles;
  columns = [{ prop: "email" }, { name: "roles" }];

  @ViewChild(DatatableComponent)
  table: DatatableComponent;

  constructor(
    router: Router,
    private authService: AuthService,
    private adminsService: AdminsService,
    private flashMessage: FlashMessagesService,
    fb: FormBuilder
  ) {
    //making a form that contains list of roles
    this.form = fb.group({
      user: [true],
      UserManager: [false],
      changeRoles: [false],
      verifyKYC: [false],
      answerTickets: [false],
      email: [""]
    });

    this.adminsService.getUserList();
    // this.user = this.form.controls['user'];
    this.UserManager = this.form.controls["UserManager"];
    this.changeRoles = this.form.controls["changeRoles"];
    this.verifyKYC = this.form.controls["verifyKYC"];
    this.email = this.form.controls["email"];
    this.answerTicket = this.form.controls["answerTicket"];

    //getting list of all admins
    this.adminsService.listAdmins().subscribe(data => {
      let admins = data["admins"];

      admins.forEach(user => {
        var roleStr = "";
        user.roles.forEach(a => {
          roleStr += a.roleTitle + ",";
        });
        user.roles = roleStr.slice(0, -1);
      });
      this.rows = admins;
      this.rows.forEach(user => {
        this.temp.push(user);
      });
    });
  }

  public onSubmit(values: Object): void {
    values["email"] = this.selected[0].email;
    this.adminsService.changeRole(values).subscribe(data => {
      let msg = data["msg"];
      let success = data["success"];
      if (success) {
        this.flashMessage.show(msg, {
          cssClass: "alert-success",
          timeout: 3000
        });
        location.reload();
      } else {
        this.flashMessage.show(msg, {
          cssClass: "alert-danger",
          timeout: 3000
        });
      }
    });
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function(d) {
      return d.email.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + "-" + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }

  onSelect({ selected }) {
    //console.log(selected.length);
    this.isUser = false;
    this.isChangeRole = false;
    this.isUserManager = false;
    this.isVerifyKYC = false;
    this.isAnswerTicket = false;
    let roles = selected[0].roles;
    let ro = roles.split(",");

    ro.forEach(i => {
      // //console.log(i);
      this.IsUser(i);
      this.IsChangeRole(i);

      this.IsVerifyKYC(i);
      this.IsAnswerTicket(i);

      this.IsUserManager(i);
    });
    // //console.log("change role",this.isChangeRole);
    // //console.log("this.isVerifyKYC",this.isVerifyKYC);
    // //console.log("this.isAnswerTicket",this.isAnswerTicket);
    // //console.log("this.isExchanger",this.isExchanger);
    // //console.log("this.user",this.isUser);

    this.selected = [];
    // //console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  IsChangeRole(roleTitle) {
    if (roleTitle == "changeRoles") {
      this.isChangeRole = true;
    }
    // else {
    //   this.isChangeRole= false
    // }
  }

  IsUser(roleTitle) {
    let roles = roleTitle;
    // roles.forEach(role => {
    //   //console.log(role);

    // });

    if (roleTitle == "user") {
      return (this.isUser = true);
    }
    // else {
    //  return this.isUser = false;
    //   //console.log(roleTitle);
    // }
  }

  IsUserManager(roleTitle) {
    if (roleTitle == "userManager") {
      this.isUserManager = true;
    }
    // else {
    //   this.isExchanger = false
    // }
  }

  IsVerifyKYC(roleTitle) {
    if (roleTitle == "verifyKYC") {
      this.isVerifyKYC = true;
    }
    // else {
    //   this.isVerifyKYC= false
    // }
  }

  IsAnswerTicket(roleTitle) {
    if (roleTitle == "answerTickets") {
      this.isAnswerTicket = true;
    }
    // else {
    //   this.isAnswerTicket= false
    // }
  }

  ngOnInit() {}
}
