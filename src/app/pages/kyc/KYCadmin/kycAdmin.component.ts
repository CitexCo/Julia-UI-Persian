import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../../services/auth-service.service";
import { AdminsService } from "../../../services/admins.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ImgService } from '../../../services/img.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './kycAdmin.component.html',
  styleUrls: ['./kycAdmin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KycAdminComponent {
    public verifyFirstName:AbstractControl;
    public NotVerifyFirstName:AbstractControl;
    public verifyLastName:AbstractControl;
    public NotVerifyLastName:AbstractControl;
    public email:AbstractControl;
    public form:FormGroup;
    public router: Router;
    noUser;
    users=[];
    userEmail;
    selected = [];
    rows:any = [];
    constructor(router:Router,
        private authService:AuthService,
        private adminsService:AdminsService,
        private flashMessage: FlashMessagesService,
        private fb: FormBuilder,
        private imgService: ImgService) { 

        this.adminsService.getUserListKyc();
        this.form = fb.group({
            verifyFirstName: [false],
            verifyLastName: [false],
            verifyBirthDate: [false],
            verifyWallet: [false],
            verifyAddress: [true],
            verifyPassportImage: [false],
            verifyTelephone: [false],
            verifyImage:[false],
            email:['']
        });
        this.email = this.form.controls['email'];
        this.verifyFirstName = this.form.controls['verifyFirstName'];
        this.adminsService.getUserListKyc().subscribe(data => {

            let users = data['users']

            //console.log(data);
            if (users.length ==0) {
                this.noUser=true;
            }
            
            users.forEach(user => {
     
                    if (!user.KYCVerified) {
                        this.users.push(user)
                        
                    }
     

                
              });
              //console.log(this.users);
              
          });
      
    }
    //https://stackoverflow.com/questions/47827634/how-to-read-form-values-in-controller
    public onSubmit(value) {
        
        // for (const i in this.users) {
        //     this.users.forEach(user=>{
        //         // //console.log(user.email);
        //                 value['email'] = user.email
        //     })
        // }
        value['email'] = this.userEmail
        // console.log(value);
        
        this.adminsService.verifykyc(value).subscribe(data => {
            console.log(data);
            
            let msg = data['msg'];
            let success = data['success'];

            if(success) {
              this.flashMessage.show(msg, {cssClass: 'alert-success', timeout: 3000});
              location.reload();

            } else {
              this.flashMessage.show(msg, {cssClass: 'alert-danger', timeout: 3000});

            }
          });
        //console.log(value);
        


        
    }


    getmail(email){
        this.userEmail=email;
        
    }

}
