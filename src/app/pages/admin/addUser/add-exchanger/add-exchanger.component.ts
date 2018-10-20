import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AdminsService } from "../../../../services/admins.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-add-exchanger',
  templateUrl: './add-exchanger.component.html',
  styleUrls: ['./add-exchanger.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddExchangerComponent implements OnInit {
  displayedColumns: string[] = ['managerName', 'telephone', 'name', 'email'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource;
  public addExchangerForm: FormGroup;
  public details: any = {};
  msg;
  success;
  err;
  ax;
  photo;
  router;
  noAccess
  constructor(router: Router,private adminService: AdminsService, private formBuilder: FormBuilder, private flashMessage: FlashMessagesService) {
    //geting list of exchangers from exchangerList in adminService
    this.adminService.exchangerList().subscribe(data=>{
      // //console.log(data);
      let exchangers = data['exchangers'];
      this.dataSource = new MatTableDataSource(exchangers);
      this.dataSource.paginator = this.paginator;

      let msg = data['msg'];
      if (msg == "شما دسترسی به این بخش را ندارید") {
        this.noAccess = true;
      }
      
    });
    //making add exchanger form
    this.addExchangerForm = this.formBuilder.group({
      'email': ['',Validators.compose([Validators.required, CustomValidators.email])],
      'name': ['',Validators.required],
      'nickName': ['',Validators.required],
      'managerName': ['',Validators.required],
      'telephone': ['',Validators.required],
      'address':['',Validators.required],
      'img': ['',Validators.required],
    });
    this.router = router;
   }

  ngOnInit() {
  }

  submit(){
    this.details.firstName = this.addExchangerForm.value.nickName;
    this.details.lastName = this.addExchangerForm.value.managerName;
    this.details.email = this.addExchangerForm.value.email;
    this.details.telephone = this.addExchangerForm.value.telephone;
    this.details.address = this.addExchangerForm.value.address;
    this.details.image = this.ax;
    // //console.log(this.details);
    
    this.adminService.registerExchanger(this.details).subscribe(data=>{
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
  PersonImage(event) {
    let fileType = event.target.files[0].type;
    let fileSize = event.target.files[0].size;
        // //console.log(fileType);


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
goBack(){
  location.reload();
}

}
