    import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
    import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from "@angular/material";
    import { FormBuilder, FormGroup, Validators } from "@angular/forms";
    import { MatTableDataSource } from "@angular/material";
    import { ExchangerService } from "../../../services/exchanger.service";
    import { ImgService } from '../../../services/img.service';
    import { UserInfo, UserReceipt } from "../../../models/user";

    @Component({
    selector: "app-exchanger-user-list",
    templateUrl: "./exchanger-user-list.component.html",
    styleUrls: ["./exchanger-user-list.component.scss"],
    encapsulation: ViewEncapsulation.None
    })
    export class ExchangerUserListComponent implements OnInit {
    user: UserInfo;
    receipt: UserReceipt;
    Columns: string[] = [
        "receiptNumber",
        "userEmail",
        "amount",
        "verificationCode",
        "codeExpiration",
        "status"
    ];
    displayedColumns: string[] = [
        "شماره رسید",
        "ایمیل",
        "میزان سرمایه گذاری",
        "کد پیگیری",
        "تاریخ انقضا",
        "وضعیت"
    ];
    dataSource = new MatTableDataSource<UserReceipt>([]);
    expandedElement: UserReceipt;

    constructor(
        private exchangerService: ExchangerService,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit() {}

    findReceipt(verificationCode) {
        this.exchangerService
        .getReceiptByCode(verificationCode)
        .subscribe(receipt => {
            if (receipt) {
            this.receipt = receipt;
            this.dataSource.data = [receipt];
            //console.log(receipt);

            this.exchangerService.getUser(receipt.userEmail).subscribe(user => {
                if (user) {
                this.user = user;
                } else {
                this.user = null;
                this.openSnackBar("عدم دریافت اطلاعات کاربر", "خطا");
                }
            });
            } else {
            this.receipt = null;
            this.user = null;
            this.dataSource = new MatTableDataSource<UserReceipt>([]);
            this.openSnackBar("هیچ رسیدی یافت نشد", "خطا");
            }
        });
        // this.user = USERS[0]
        // this.receipt = RECEIPTS[0]
        // this.dataSource.data = [RECEIPTS[0]]
    }

    openSnackBar(message: string, action: string) {
        let verticalPosition: MatSnackBarVerticalPosition = "top";
        let config = new MatSnackBarConfig();
        config.verticalPosition = verticalPosition;
        config.duration = 2000;
        this.snackBar.open(message, action, config);
    }
    }

    const USERS = [
    {
        firstName: "حسین",
        lastName: "نمازیان",
        telephone: "09122834489",
        email: "namazian87@gmail.com",
        KYCCode: "HADCIADCLK",
        KYCUpdated: false,
        KYCVerified: false,
        SignedContract: false,
        balance: 10000,
        birthDate: "3089438746834",
        hasWallet: false,
        imageAddress: "dlbnfklb",
        passportImageAddress: "dfbsgb",
        registeredDate: "2018-10-12"
    }
    ];

    const RECEIPTS = [
    {
        _id: "1",
        exchanger: "saraf",
        exchangerEmail: "saraf",
        user: "user",
        status: "pending",
        amount: 2,
        userEmail: "user@user.com",
        verificationCode: "jquery",
        codeExpiration: "5",
        receiptNumber: 6
    },
    {
        _id: "2",
        exchanger: "saraf",
        exchangerEmail: "saraf",
        user: "user",
        status: "approved",
        amount: 2,
        userEmail: "babi@user.com",
        verificationCode: "html",
        codeExpiration: "5",
        receiptNumber: 6
    },
    {
        _id: "3",
        exchanger: "saraf",
        exchangerEmail: "saraf",
        user: "user",
        status: "pending",
        amount: 2,
        userEmail: "jamshid@user.com",
        verificationCode: "javascript",
        codeExpiration: "5",
        receiptNumber: 6
    },
    {
        _id: "4",
        exchanger: "saraf",
        exchangerEmail: "saraf",
        user: "user",
        status: "approved",
        amount: 2,
        userEmail: "kamran@user.com",
        verificationCode: "4",
        codeExpiration: "5",
        receiptNumber: 6
    },
    {
        _id: "5",
        exchanger: "saraf",
        exchangerEmail: "saraf",
        user: "user",
        status: "pending",
        amount: 2,
        userEmail: "jafar@user.com",
        verificationCode: "4",
        codeExpiration: "5",
        receiptNumber: 6
    },
    {
        _id: "5",
        exchanger: "saraf",
        exchangerEmail: "saraf",
        user: "user",
        status: "pending",
        amount: 2,
        userEmail: "jafar@user.com",
        verificationCode: "4",
        codeExpiration: "5",
        receiptNumber: 6
    }
    ];


    @Component({
    selector: "exchanger-verification",
    templateUrl: "exchanger-verification.html",
    styleUrls: ["exchanger-verification.scss"]
    })
    export class ExchangeVerificationComponent {
    isLinear = false;
    userFormGroup: FormGroup;
    receiptFormGroup: FormGroup;

    querySent = false;
    imageSource;
    showPersonelImage = true  
    userPhoto

    docImage: AbstractWorker;
    photo: any;

    @Input("user-receipt")
    userReceipt;
    @Input("user-info")
    userInfo;

    constructor(
        private snackBar: MatSnackBar,
        private exchangeService: ExchangerService,
        private formBuilder: FormBuilder,
        public imageService: ImgService
    ) {
    }
    
    ngOnInit() {          
        this.userFormGroup = this.formBuilder.group({
            userCtrl: ["", Validators.required]
        });
        this.receiptFormGroup = this.formBuilder.group({
            receiptCtrl: ["", Validators.required]
        });
    }
    
    ngOnChanges() {
        this.imageSource = this.imageService.getImg(this.userInfo.imageAddress)
        this.showPersonelImage = false
        //console.log('after view init')
    }

    toggleImageSource() {
        //console.log('toggle')
        if (this.showPersonelImage) {
            this.showPersonelImage = false
            this.imageSource = this.imageService.getImg(this.userInfo.imageAddress)
        } else {
            this.showPersonelImage = true
            this.imageSource = this.imageService.getImg(this.userInfo.passportImageAddress)
        }

    }

    _verifyImage(fileType, fileSize) {
        if (
        fileType !== "image/png" &&
        fileType !== "image/jpg" &&
        fileType !== "image/jpeg"
        ) {
        //console.log("invalid file type");
        return null;
        } else if (fileSize > 1000000) {
        //console.log("too large image");
        return null;
        }
        return true;
    }

    selectImage(event) {
        if (event.target.files && event.target.files[0]) {
        let fileType = event.target.files[0].type;
        let fileSize = event.target.files[0].size;

        if (this._verifyImage(fileType, fileSize)) {
            this.docImage = event.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
            this.photo = reader.result;
            };
        }
        }
    }

    removeImage() {
        this.photo = null;
    }

    confirmUser(comment) {
        this.querySent = true;
        let receipt = {
        receiptNumber: this.userReceipt.receiptNumber,
        comment: comment,
        receipt: this.docImage
        };
        this.exchangeService.confirmReceipt(receipt).subscribe(resp => {
        if (resp["success"]) {
            this.openSnackBar(resp["msg"], "");
        } else {
            this.openSnackBar(resp["msg"], "خطا");
        }
        });
    }

    openSnackBar(message: string, action: string) {
        let verticalPosition: MatSnackBarVerticalPosition = "top";
        let config = new MatSnackBarConfig();
        config.verticalPosition = verticalPosition;
        config.duration = 2000;
        this.snackBar.open(message, action, config);
    }

}
