import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { TokenTransfer } from '../../../models/token-transfer';
import { Token } from '../../../models/token';
import { Account } from '../../../models/account';
import { TokenService } from '../../../services/token.service';
import { AdminsService } from '../../../services/admins.service';
import * as moment from 'moment';
@Component({
  selector: 'admin-transfer',
  templateUrl: './admin-transfer.component.html',
  styleUrls: ['./admin-transfer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminTransferComponent implements OnInit {
    reciptNum;
    approveForm;
    Msg;
    err;
    success;
    rejectForm
    transfers = [] as TokenTransfer[];
    Columns: string[] = ['transferRequestNumber', 'userEmail', 'walletAddress', 'amount', 'transfer']
    displayedColumns: string[] = ['شماره رسید', 'ایمیل', 'انتقال به', 'تعداد توکن', 'انتقال'];
    displayedPendingColumns: string[] = ['status', 'submitDate', 'amount', 'tokenPrice','userEmail','reqNum'];
    dataSource = new MatTableDataSource<TokenTransfer>(this.transfers);
    pendingTransfer;
    pendingTransferDataSource;
    public details: any = {};
    @ViewChild(MatPaginator) paginator: MatPaginator;

    token = {} as Token;
    account = {} as Account;

    constructor(
        private tokenService: TokenService,
        public adminService: AdminsService,
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        private fb: FormBuilder,) 
    {

        this.adminService.alltransferList().subscribe(data=>{
            console.log(data);
            this.pendingTransfer = data;
            this.pendingTransferDataSource = new MatTableDataSource(this.pendingTransfer);
            this.pendingTransferDataSource.paginator = this.paginator;
            this.pendingTransfer.forEach(i => {
                i.userSubmitDate= moment(i.userSubmitDate).format('MM/DD/YYYY');
            });
        });
            //making approve form
    this.approveForm =fb.group({
        'comment': [''],
  
      });
          //making reject form
      this.rejectForm =fb.group({
        'comment': ['',Validators.required],
  
      });
    }
  //approving request function
  approve(){
    this.details.comment =this.approveForm.controls['comment'].value;
    this.details.transferRequestNumber = this.reciptNum;
    this.adminService.approveTransfer(this.details).subscribe(data=>{
      // //console.log(data);
      
      this.Msg = data['msg'];
      let success = data['success'];

      if(success) {
        this.err = false;
        this.success = true;
        setTimeout(() => {
          location.reload()
      }, 3000);
      } if(!success) {
        this.success = false;
        this.err = true;
        setTimeout(() => {
          location.reload()
      }, 3000); 
      }
      
    })
    
  }
  //rejecting request function
  reject(){
    // //console.log(this.reciptNum);
    this.details.comment =this.rejectForm.controls['comment'].value;

    this.details.transferRequestNumber = this.reciptNum;
    if (this.rejectForm.valid) {
      // //console.log('valiiiid');
      
      this.adminService.rejectTransfer(this.details).subscribe(data=>{
        // //console.log(data);
        
        this.Msg = data['msg'];
        let success = data['success'];
  
        if(success) {
          this.err = false;
          this.success = true;
          setTimeout(() => {
            location.reload()
        }, 3000);
        } if(!success) {
          this.success = false;
          this.err = true;
          setTimeout(() => {
            location.reload()
        }, 3000); 
        }
        
      })   
    } else{

      
    }

    
  }
    async ngOnInit() {

        this.account = await this.tokenService.getAccountInfo()
        // console.log(this.account)
        
        this.dataSource.paginator = this.paginator;
        try {
            this.token = await this.tokenService.getTokenInfo()
            //console.log(this.token)
        } catch(ex) {
            this.token = {} as Token;
        }

        this.adminService.getTransferList().subscribe((list: TokenTransfer[]) => {
            // console.log(list)
            this.dataSource.data = list
            this.transfers = list
        })
    }

    async transfer(element) {
        try {
            console.log(this.account.address);
            
            let transaction = await this.tokenService.transferToken(element.walletAddress, `${element.amount}`)
            transaction.send({ from: this.account.address })
            .on('transactionHash', txHash => {
                console.log('transactioHash: ', txHash)
                this.openSnackBar('تراکنش ارسال گردبد', '')
            })
            .on('receipt', receipt => {
                console.log('receipt: ', receipt)
                this.openSnackBar('تراکنش با موفقبت انجام شد', '')
            })
            .on('error', error => {
                throw Error(error)
            })
        } catch(ex) {
            console.log('transaction failed: ', ex)
            this.openSnackBar('تراکنش با خطا روبرو شد', '')
        }
    }
    getNum(num){
        this.reciptNum = num;
        
      }
    async showAccount() {
        try {
            this.account = await this.tokenService.getAccountInfo()
            const dialogRef = this.dialog.open(AccountInfoComponent, {
                panelClass: 'verification',
                width: '30%', 
                data: this.account 
            });

            //console.log(this.account)
        } catch(ex) {
            //console.log(ex)
            this.account = {} as Account;
        }
    }

    async showContract() {
        try {
            this.token = await this.tokenService.getTokenInfo()
            const dialogRef = this.dialog.open(TokenInfoComponent, {
                panelClass: 'verification',
                width: '40%', 
                data: this.account 
            });
        } catch(ex) {
            // ToDo: apply error to UI
            //console.log(ex)
            this.token = {} as Token;
        }
    }

    openSnackBar(message: string, action: string) {
        let verticalPosition: MatSnackBarVerticalPosition = "top";
        let config = new MatSnackBarConfig();
        config.verticalPosition = verticalPosition;
        config.duration = 2000;
        this.snackBar.open(message, action, config);
    }
}
























const INIT_DATA: TokenTransfer[] = [
    {receiptNumber: 1, userEmail: "user@user.com",      to: "0xc3c49e620b250e1421f9054eac5b230f9730b048", from: "0xb3eece8b0d3a389fd182e46ef55b3a6e270cfb17", amount: '2'},
    {receiptNumber: 2, userEmail: "babi@user.com",      to: "0xc3c49e620b250e1421f9054eac5b230f9730b048", from: "0xb3eece8b0d3a389fd182e46ef55b3a6e270cfb17", amount: '2'},
    {receiptNumber: 3, userEmail: "jamshid@user.com",   to: "0xc3c49e620b250e1421f9054eac5b230f9730b048", from: "0xb3eece8b0d3a389fd182e46ef55b3a6e270cfb17", amount: '2'},
    {receiptNumber: 4, userEmail: "kamran@user.com",    to: "0xc3c49e620b250e1421f9054eac5b230f9730b048", from: "0xb3eece8b0d3a389fd182e46ef55b3a6e270cfb17", amount: '2'},
    {receiptNumber: 5, userEmail: "jafar@user.com",     to: "0xc3c49e620b250e1421f9054eac5b230f9730b048", from: "0xb3eece8b0d3a389fd182e46ef55b3a6e270cfb17", amount: '2'},
]


@Component({
  selector: 'account-info',
  templateUrl: './account-info.html',
  styleUrls: ['./account-info.scss']
})
export class AccountInfoComponent implements OnInit {

    account = {} as Account;

    constructor(private tokenService: TokenService) { }

    async ngOnInit() {
        try {
            this.account = await this.tokenService.getAccountInfo()
        } catch(ex) {
            this.account = {} as Account;
        }
    }

    async updateInfo($event) {
        try {
            this.account = await this.tokenService.getAccountInfo($event.target.value)
            //console.log(this.account);
            
        } catch(ex) {
            // ToDo: apply error to UI
            //console.log(ex)
            this.account = {} as Account;
        }
    }
}


@Component({
  selector: 'token-info',
  templateUrl: './token-info.html',
  styleUrls: ['./token-info.scss']
})
export class TokenInfoComponent implements OnInit {

    token = {} as Token;

    constructor(private tokenService: TokenService) { }

    async ngOnInit() {
        try {
            this.token = await this.tokenService.getTokenInfo()
            //console.log(this.token)
        } catch(ex) {
            this.token = {} as Token;
        }
    }

    async updateToken($event) {
        try {
            this.token = await this.tokenService.getTokenInfo($event.target.value)
        } catch(ex) {
            // ToDo: apply error to UI
            //console.log(ex)
            this.token = {} as Token;
        }
    }

}
