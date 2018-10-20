import { Component, ViewEncapsulation } from '@angular/core';
import { Router ,ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from "../../services/auth-service.service";
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
    public router: Router;
    public form:FormGroup;
    public name:AbstractControl;
    public email:AbstractControl;
    public password:AbstractControl;
    public referal:AbstractControl;
    public confirmPassword:AbstractControl;
    logdin:boolean=false;
    constructor(private activatedRoute: ActivatedRoute,router:Router,
                 fb:FormBuilder,
                 private authService:AuthService,
                 private flashMessage: FlashMessagesService){
                             // subscribe to router event
                             if(!this.authService.loggedIn()) {
                                this.logdin = true;
                              }
        this.router = router;
        this.form = fb.group({
            email: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            referal: [''],
        },{validator: matchingPasswords('password', 'confirmPassword')});


        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.confirmPassword = this.form.controls['confirmPassword'];
        this.referal = this.form.controls['referal'];
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            if(params){
               let ref = params['referalCode']
               this.referal.setValue(ref);
  
}
});
    }

     public onSubmit(values:Object):void {
        if (this.form.valid) {
            //console.log(values);
                // Register user
    this.authService.registerUser(values).subscribe(data => {
        let msg = data['msg'];
        let success = data['success'];
        if(success) {
          this.flashMessage.show(msg, {cssClass: 'alert-success', timeout: 10000});
          setTimeout(() => {
            this.router.navigate(['/login']);
        }, 10000); 

        } else {
          this.flashMessage.show(msg, {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/register']);
        }
      });
        }
    }

    ngAfterViewInit(){
        document.getElementById('preloader').classList.add('hide');
    }
}

export function emailValidator(control: FormControl): {[key: string]: any} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password= group.controls[passwordKey];
        let passwordConfirmation= group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true})
        }
    }
}
