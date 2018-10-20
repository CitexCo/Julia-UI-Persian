import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from "../../../services/auth-service.service";
import { ImgService } from "../../../services/img.service";
@Component({
  selector: 'app-exchanger-details',
  templateUrl: './exchanger-details.component.html',
  styleUrls: ['./exchanger-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExchangerDetailsComponent implements OnInit {
  exchangerEmail;
  selectedExchanger;
  public details: any = {};
  constructor( private activatedRoute: ActivatedRoute,private authService: AuthService , public imageService:ImgService) { 

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.exchangerEmail = params['email'];
      this.getExchanger();
    });
  }
  getExchanger(){
    this.details.exchangerEmail = this.exchangerEmail
    this.authService.getExchanger(this.details).subscribe(data=>{
      this.selectedExchanger = data['exchanger'];
      //console.log(this.selectedExchanger);
      
      
    });
  }

  ngOnInit() {


  }

}
