import { Component, ViewEncapsulation,OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RpcService } from "./../../services/rpc.service";
import * as moment from 'moment';
import { AuthService } from "../../services/auth-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
	EuroData=[];
	EtherData=[];
	chartEu;
	chartEth;
	KYCVerified;
	KYCUpdated;
	userEmail;
	balance;
	userType;
	lastPrice;
	constructor(private rpcService:RpcService , public authService: AuthService){
		//getting profile of logged in user and set it to global varibles
		this.authService.getProfile().subscribe(data=>{
			//console.log(data);
			let user = data['user'];
			this.KYCUpdated = user.KYCUpdated;
			this.KYCVerified = user.KYCVerified;
			this.userEmail = user.email;
			this.balance = user.balance;
		});

		let user =JSON.parse(localStorage.getItem('user')) ;
		this.userType = user.accountType

		this.rpcService.getLastPrice().subscribe(data=>{
			let price = data['price'];
			this.lastPrice = price.price;
			// console.log(data);
			
		})
		
		this.rpcService.getPrice({'type':'Euro'}).subscribe(data=>{

			
			let prices = data['prices']

			prices.forEach(element => {
				this.EuroData.push({
					x:  element.date,
					y: element.price.toString()
				});

			});
			 	
			this.chartEu.update();		
			
			
		});
		this.rpcService.getPrice({'type':'Ether'}).subscribe(data=>{

			
			let prices = data['prices']

			prices.forEach(element => {
				this.EtherData.push({
					x:  element.date,
					y: element.price.toString()
				});

			});
			 	
			this.chartEth.update();		
			
			
		});
	}

	ngOnInit() {


		//console.log(this.EuroData);
		

    this.chartEu = new Chart('canvas',{
      type: 'line',
	  data: {
		   datasets: [{
				label: 'Price',
				backgroundColor: "rgb(75, 192, 192)",
				borderColor: "rgb(75, 192, 192)",
				fill: false,
				data: this.EuroData
		   }]
	  },
			options: {
				responsive: true,
				title: {
					 display: true,
					 text: 'قیمت به یورو'
				},
				scales: {
					 xAxes: [{
						  type: 'time',
						  display: true,
						  scaleLabel: {
							   display: true,
							   labelString: 'Date'
						  },
						  ticks: {
							   major: {
									fontStyle: 'bold',
									fontColor: '#FF0000'
							   }
						  }
					 }],
					 yAxes: [{
						  display: true,
						  scaleLabel: {
							   display: true,
							   labelString: 'value'
						  }
					 }]
				}
		   }
			
	});
	
	this.chartEth = new Chart('canvas2',{
		type: 'line',
		data: {
			 datasets: [{
				  label: 'Price',
				  backgroundColor: " #c99d66",
				  borderColor: " #c99d66",
				  fill: false,
				  data: this.EtherData
			 }]
		},
			  options: {
				  responsive: true,
				  title: {
					   display: true,
					   text: 'قیمت به اتریوم'
				  },
				  scales: {
					   xAxes: [{
							type: 'time',
							display: true,
							scaleLabel: {
								 display: true,
								 labelString: 'Date'
							},
							ticks: {
								 major: {
									  fontStyle: 'bold',
									  fontColor: '#FF0000'
								 }
							}
					   }],
					   yAxes: [{
							display: true,
							scaleLabel: {
								 display: true,
								 labelString: 'value'
							}
					   }]
				  }
			 }
			  
	  });
      }

}
