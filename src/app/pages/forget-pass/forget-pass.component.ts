import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../services/auth-service.service";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgetPassComponent implements OnInit {
  public router: Router;
  public form:FormGroup;
  public email:AbstractControl;


  constructor(router:Router, 
              fb:FormBuilder,
              private authService:AuthService,
              private flashMessage: FlashMessagesService) {
      this.router = router;
      //making forget pass form
      this.form = fb.group({
          'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
      });

      this.email = this.form.controls['email'];

  }

  //after Submit the form form values will send to forgetPass function in authService
  //and receive user data and store it
  public onSubmit(values:Object):void {
      if (this.form.valid) {
        this.authService.forgetPass(values).subscribe(data => {
          //console.log(data);
          let msg = data['msg'];
          let success = data['success'];
          let token = data ['token'];
          let user = data['user']
            if(success) {
              this.authService.storeUserData(token, user);
              this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
              this.router.navigate(['/login']);
            } else {
              this.flashMessage.show(msg, {cssClass: 'alert-danger', timeout: 5000});
            }
        });
          this.router.navigate(['pages/dashboard']);
        
      }
  }


  ngOnInit() {
  }

}
