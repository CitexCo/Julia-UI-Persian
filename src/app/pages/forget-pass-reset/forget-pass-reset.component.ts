import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import { AuthService } from "../../services/auth-service.service";
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-forget-pass-reset',
  templateUrl: './forget-pass-reset.component.html',
  styleUrls: ['./forget-pass-reset.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgetPassResetComponent implements OnInit {
  public router: Router;
  public form:FormGroup;
  public password:AbstractControl;
  resetpasswordtoken;
  email;
  constructor(private activatedRoute: ActivatedRoute,router:Router, 
    fb:FormBuilder,
    private authService:AuthService,
    private flashMessage: FlashMessagesService) {
      this.authService.ForgetResetPass('as')
      this.router = router;
      this.form = fb.group({
          'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
      this.password = this.form.controls['password'];

    
   }

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.email = params['email'];
      this.resetpasswordtoken = params['resetpasswordtoken'];
      
    });
  }
  public onSubmit(values:Object):void {
    if (this.form.valid) {
      //if form is valid then send new password to ForgetResetPass function in authService
      values['resetpasswordtoken'] = this.resetpasswordtoken;
      values['email'] = this.email;
      values['password'] = this.form.value.password
      this.authService.ForgetResetPass(values).subscribe(data => {
        let msg = data['msg'];
        let success = data['success'];

        if(success) {
          this.flashMessage.show(msg, {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['/pages']);
        } else {
          this.flashMessage.show(msg, {cssClass: 'alert-danger', timeout: 5000});
        }
      });
        // this.router.navigate(['pages/']);
    }
}

}
