import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../services/auth-service.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPassComponent implements OnInit {
  public form: FormGroup;
  public router: Router;
  constructor(router:Router,public formBuilder: FormBuilder,private authService:AuthService,private flashMessage: FlashMessagesService) {     this.router = router;}


  ngOnInit() {
    let OldPass = new FormControl('', Validators.required);
    let password = new FormControl('', Validators.required);
    let ConfirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.form = this.formBuilder.group({
      password: password,
      ConfirmPassword: ConfirmPassword,
      OldPass:OldPass
    })
  }
  submitForm(values:Object){
    if (this.form.valid) {
      //if form is valid form values will send to auth Service
      this.authService.resetPasswor(values).subscribe(data => {
        let msg = data['msg'];
        let success = data['success'];
          if(success) {
            this.flashMessage.show(msg, {cssClass: 'alert-success', timeout: 5000});
            this.router.navigate(['/pages']);
          } else {
            this.flashMessage.show(msg, {cssClass: 'alert-danger', timeout: 5000});
          }
      });
      
    }
    
  }
}
