import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ExchangerService } from '../../../services/exchanger.service';
import { UserInfo, UserReceipt } from '../../../models/user';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as moment from 'moment';


/**
 * @title Table with expandable rows
 */
@Component({
    selector: 'app-exchanger-history-list',
    templateUrl: './exchanger-history-list.component.html',
    styleUrls: ['./exchanger-history-list.component.scss'],
    animations: [
        trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ExchangerHistoryListComponent implements OnInit {
    
    receipts: UserReceipt[];
    Columns: string[] = ['receiptNumber', 'userEmail', 'amount', 'verificationCode', 'codeExpiration', 'status']
    displayedColumns: string[] = ['شماره رسید', 'ایمیل', 'میزان سرمایه گذاری', 'کد پیگیری', 'تاریخ انقضا', 'وضعیت']
    dataSource = new MatTableDataSource<UserReceipt>(this.receipts);
    expandedElement: UserReceipt;
    user: UserInfo;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private exchangerService: ExchangerService, 
        public snackBar: MatSnackBar,
        public dialog: MatDialog) {}
    
    ngOnInit() {
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = function(data, filter: string): boolean {
            return data.verificationCode.toLowerCase().includes(filter);
        };

        this.exchangerService.getList()
        .subscribe(receipts => {
            this.receipts = this.initializeReceiptItems(receipts)
            this.dataSource.data = this.receipts
        })

    }

    filterReceipts(e) {
        if (e.checked) {
            this.exchangerService.getPendingList()
            .subscribe(receipts => {
                this.receipts = this.initializeReceiptItems(receipts)
                this.dataSource.data = this.receipts
            })
        } else {
            this.exchangerService.getList()
            .subscribe(receipts => {
                this.receipts = this.initializeReceiptItems(receipts)
                this.dataSource.data = this.receipts
            })
        }
    }

    initializeReceiptItems(receipts): UserReceipt[] {
        let receipt = receipts.map((receipt: UserReceipt) => { return receipt })
        return receipt
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    // openSnackBar(message: string) {
    //     let verticalPosition: MatSnackBarVerticalPosition = 'top';
    //     let config = new MatSnackBarConfig()
    //     config.verticalPosition = verticalPosition
    //     config.duration = 2000
    //     this.snackBar.open(message, '', config);
    // }

    // openStatusDialog(receipt) {
    //     this.exchangerService.getUser(receipt.userEmail)
    //     .subscribe(user => {
    //         this.user = user
    //         //console.log(user)
    //         const dialogRef = this.dialog.open(ExchangeVerificationComponent, {
    //             panelClass: 'verification',
    //             width: '50%',
    //             data: {userInfo: user, userReceipt: receipt} });

    //         dialogRef.afterClosed().subscribe(data => {
    //             this.openSnackBar(data.msg)
    //             //console.log(data.success)
    //         })
    //     })
    // }
}

const INIT_DATA = [
    {_id:"1", exchanger: "saraf", exchangerEmail: "saraf", user: "user", status: "pending", amount: 2, userEmail: "user@user.com", verificationCode: "jquery", codeExpiration: "5", receiptNumber: 6},
    {_id:"2", exchanger: "saraf", exchangerEmail: "saraf", user: "user", status: "approved", amount: 2, userEmail: "babi@user.com", verificationCode: "html", codeExpiration: "5", receiptNumber: 6},
    {_id:"3", exchanger: "saraf", exchangerEmail: "saraf", user: "user", status: "pending", amount: 2, userEmail: "jamshid@user.com", verificationCode: "javascript", codeExpiration: "5", receiptNumber: 6},
    {_id:"4", exchanger: "saraf", exchangerEmail: "saraf", user: "user", status: "approved", amount: 2, userEmail: "kamran@user.com", verificationCode: "4", codeExpiration: "5", receiptNumber: 6},
    {_id:"5", exchanger: "saraf", exchangerEmail: "saraf", user: "user", status: "pending", amount: 2, userEmail: "jafar@user.com", verificationCode: "4", codeExpiration: "5", receiptNumber: 6},
    {_id:"5", exchanger: "saraf", exchangerEmail: "saraf", user: "user", status: "pending", amount: 2, userEmail: "jafar@user.com", verificationCode: "4", codeExpiration: "5", receiptNumber: 6},
]
