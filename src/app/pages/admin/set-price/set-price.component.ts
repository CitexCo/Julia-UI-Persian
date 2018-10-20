import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RpcService } from "./../../../services/rpc.service";
@Component({
  selector: 'app-set-price',
  templateUrl: './set-price.component.html',
  styleUrls: ['./set-price.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetPriceComponent implements OnInit {
  public priceForm: FormGroup;
  public details: any = {};
  err;
  success;
  Msg;
  lastPrice;
  constructor(public formBuilder: FormBuilder, public rpcService: RpcService) {
    this.priceForm = formBuilder.group({
      'price': ['', Validators.required],

    });
    this.rpcService.getLastPrice().subscribe(data=>{
			let price = data['price'];
			this.lastPrice = price.price;
			// console.log(data);
			
		})
  }

  ngOnInit() {
  }

  submitForm() {
    this.details.price = this.priceForm.controls['price'].value;
    if (this.priceForm.valid) {
      this.rpcService.setPrice(this.details).subscribe(data => {
        //console.log(data);
        let success = data['success'];
        this.Msg = data['msg'];

        if (success) {
          this.success = true;
            setTimeout(() => {
              this.success = null;
          }, 3000);
        }
        else if (!success) {
          this.err = true;
          setTimeout(() => {
            this.err = null;
        }, 3000);
        }
      });
    }


  }

}
