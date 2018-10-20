import { Component, ViewEncapsulation ,OnInit} from '@angular/core';
import { Router ,ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../services/auth-service.service";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public router: Router;
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  logdin:boolean=false;
defmsg;
paramMsg;
  constructor(private activatedRoute: ActivatedRoute,router:Router, 
              fb:FormBuilder,
              private authService:AuthService,
              private flashMessage: FlashMessagesService) {
                 //console.log(this.authService.loggedIn());
                
      this.router = router;
      this.form = fb.group({
          'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
          'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });

      this.email = this.form.controls['email'];
      this.password = this.form.controls['password'];
  }
  ngOnInit() {
        // subscribe to router event
        this.activatedRoute.queryParams.subscribe((params: Params) => {
          if(params){
            this.paramMsg = params['msg'];
            //console.log(params);
            
          }
          else{
            //console.log('aaaaaaasds');
            
          }
          // this.defmsg = params['msg'];
          
          // this.flashMessage.show( params['msg'], {cssClass: 'alert-success', timeout: 10000});
        });

        if(!this.authService.loggedIn()) {
          this.logdin = true;
        }
    
  }

  public onSubmit(values:Object):void {
      if (this.form.valid) {
        this.authService.authenticateUser(values).subscribe(data => {
          //console.log(data);
          
          let msg = data['msg'];
          let success = data['success'];
          let token = data ['token'];
          let user = data['account']
            if(success) {
              this.authService.storeUserData(token, user);
              this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
              this.router.navigate(['pages/']);
            } else {
              this.flashMessage.show(msg, {cssClass: 'alert-danger', timeout: 5000});
              this.router.navigate(['login']);
            }
        });
          this.router.navigate(['pages/']);
      }
  }

  // ngAfterViewInit(){
  //     document.getElementById('preloader').classList.add('hide');                 
  // }

}
