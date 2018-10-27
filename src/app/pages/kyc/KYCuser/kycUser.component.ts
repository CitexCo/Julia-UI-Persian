import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../../services/auth-service.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ImgService } from "./../../../services/img.service";
import * as moment from 'moment';
@Component({
    selector: 'app-kycUser',
    templateUrl: './kycUser.component.html',
    styleUrls: ['./kycUser.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class KycUserComponent implements OnInit {

    minDate = new Date(1900, 0, 1);
    maxDate = new Date(2000, 0, 1);
    public steps: any[];
    public accountForm: FormGroup;
    public personalForm: FormGroup;
    public AddressForm: FormGroup;
    public WalletForm: FormGroup;
    public details: any = {};
    public showConfirm: boolean;
    public confirmed: boolean;
    public SecondPhoto: any;
    public PersonPhoto: any;
    public router: Router;
    dataSuccess: boolean;
    dataMsg;
    //
    KYCVerified: boolean = false;
    KYCupdated: boolean = false;
    address;
    email;
    firstName;
    lastname;
    passImg;
    telephone;
    walletAddress;
    reseted: boolean = false;
    //
    havePersonImg: boolean = false;
    haveWallet;
    PersonAx;
    SecondAx;
    photoName: any;
    photoContent: any;
    fileExtension: any;
    fileExtensionError: boolean;
    validAddress: boolean = true;
    fileExtensionMessage: any;
    balance;
    kycCode;
    dateFormControl = new FormControl('', [
        Validators.required,
    ]);
    // validator for personal photo
    PersonImage(event) {
        let fileType = event.target.files[0].type;
        let fileSize = event.target.files[0].size;
        //console.log(fileType);
        //if uploaded image is not png or jpg or jpeg the error shows to user

        if (fileType != 'image/png') {
            if (fileType != 'image/jpg') {
                if (fileType != 'image/jpeg') {
                    this.fileExtensionError = true;
                    this.fileExtensionMessage = '';
                    this.fileExtensionMessage = 'This is Not an Valid image please select .png or .jpg file';
                    //console.log(event.target.files[0]);
                }


            }
            // if uploaded image size is more than 1MB the error gona shows to user
        } if (fileSize > 1000000) {
            this.fileExtensionError = true;
            this.fileExtensionMessage = '';
            this.fileExtensionMessage = 'Maximum image size is : 1MB';
        }
        // if every thing is ok then the image will save and ready to upload
        else {
            //console.log(event.target.files[0]);
            this.PersonAx = event.target.files[0];
            this.fileExtensionError = false;
            this.fileExtensionMessage = '';
            this.havePersonImg = true;
            const reader = new FileReader();
            const file = event.target.files[0];
            reader.onload = () => {
                this.PersonPhoto = reader.result;
            }
            reader.readAsDataURL(file);

        }


    }
    // validator for KYC image
    SecondImage(event) {
        let fileType = event.target.files[0].type;
        let fileSize = event.target.files[0].size;
        //console.log(fileType);


        if (fileType != 'image/png') {
            if (fileType != 'image/jpg') {
                if (fileType != 'image/jpeg') {
                    // document.getElementById('secondForm').reset();
                    // document.getElementById('imginput').value =''
                    this.fileExtensionError = true;
                    this.fileExtensionMessage = '';
                    this.fileExtensionMessage = 'This is Not an Valid image please select .png or .jpg file';
                    //console.log(event.target.files[0]);
                }


            }

        } if (fileSize > 1000000) {
            // document.getElementById('secondForm').reset();
            // event.target.files[0]='';

            this.fileExtensionError = true;
            this.fileExtensionMessage = '';
            this.fileExtensionMessage = 'Maximum image size is : 1MB';
        }
        else {
            //console.log(event.target.files[0]);
            this.SecondAx = event.target.files[0];
            this.fileExtensionError = false;
            this.fileExtensionMessage = '';
            this.havePersonImg = true;
            const reader = new FileReader();
            const file = event.target.files[0];
            reader.onload = () => {
                this.SecondPhoto = reader.result;
            }
            reader.readAsDataURL(file);

        }


    }
    Wallet(evnt) {
        //console.log(evnt);
        //if user select that have wallet address the haveWallet varible will be true and if its get true
        // then the input field will display
        if (evnt.source.checked) {
            this.haveWallet = true;

        }
    }
    //if user unselect that have wallet address the haveWallet varible will be false and if its get false
    // then the input field will hide
    NoWallet(evnt) {
        if (evnt.source.checked) {
            this.haveWallet = false;

        }
    }

    ngOnInit() {
        //get data of logged in user and parse it to JSON (its saved as string)
        let user = JSON.parse(localStorage.getItem('user'));

        if (this.reseted) {
            user.KYCVerified = false;

        }

    }
    constructor(
        public dialog: MatDialog,
        router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private flashMessage: FlashMessagesService,
        imgService: ImgService) {

        //from getProfile function in authservice will get all informations of loggedin user
        this.authService.getProfile().subscribe(data => {
            //console.log(data);
            let user = data['user'];
            //if user KYC has been updated the KYCupdated varible gonna be true
            if (user.KYCUpdated) {
                this.KYCupdated = true;
            }
            //if user KYC has been verified the KYCVerified varible gonna be true
            if (user.KYCVerified) {
                //if user KYC is verified then set its values to our local varibles for show in verified page
                this.KYCVerified = true;
                this.firstName = user.firstName;
                this.lastname = user.lastName;
                this.address = user.address;
                this.email = user.email;
                this.passImg = imgService.getImg(user.passportImageAddress);
                this.telephone = user.telephone;
                this.walletAddress = user.walletAddress;
                this.balance = user.balance;
            }
        })
        //getting KYC code from gtKycCode function in authService and set it to kycCode varible
        this.authService.gtKycCode().subscribe(data => {
            this.kycCode = data['code']
            //console.log(data);

        })

        this.router = router;
        //make all steps in one JSON object
        //name is name of step for handeling in Html
        //describe is a description of that step
        //icon is icon of that step
        //active if true that form in Html will shows
        //valid is saying that if this step is valid or not and if not the next step will not be shows
        //hasError says that in this step we have some issues and we cant go to next one
        this.steps = [
            { name: 'Confirm Your Details', describ: 'تایید اطلاعات', icon: 'fa-check-square-o', active: false, valid: false, hasError: false },
            { name: 'wallet Information', describ: 'آدرس حساب اتریوم', icon: 'fa-credit-card', active: false, valid: false, hasError: false },
            { name: 'Address Information', describ: 'ارسال عکس', icon: 'fa-credit-card', active: false, valid: false, hasError: false },
            { name: 'Personal Information', describ: 'اطلاعات شخصی', icon: 'fa-user', active: false, valid: false, hasError: false },
            { name: 'Start ID Verification', describ: 'آغاز پروسه', icon: 'fa-check', active: true, valid: true, hasError: false },



        ]
        //console.log(this.steps);
        //this form is empty becues its the welcome form and havnt any inputs
        this.accountForm = this.formBuilder.group({

        });
        //that form for adding wallet address
        this.WalletForm = this.formBuilder.group({
            'wallet': [''],
            'hasWallet': [false],
        });
        //the first form is this and contains all of form inputs for personal informations
        this.personalForm = this.formBuilder.group({

            'firstname': ['', Validators.required],
            'lastname': ['', Validators.required],
            'birth': ['', Validators.required],

            'phone': ['', Validators.required],

            'PersonImage': ['', Validators.required]

        });
        //this form will contains the KYC image input
        this.AddressForm = this.formBuilder.group({
            'SecondImage': ['', Validators.required],

        });
    }
    removeImage(): void {
        this.PersonPhoto = '';
    }
    //any time that the NEXT button in pressed this function will run
    public next() {
        //set all global forms localy in this function to use them inside the func
        let WalletForm = this.WalletForm;
        let personalForm = this.personalForm;
        let AddressForm = this.AddressForm;

        //if the last form is active then do nothing
        if (this.steps[this.steps.length - 5].active)
            return false;

        this.steps.some(function (step, index, steps) {

            if (index > steps.length - 5) {
                if (step.active) {
                    if (step.name == 'Start ID Verification') {
                        //set Start ID Verification step deactive and validate it
                        step.active = false;
                        step.valid = true;
                        // set the next step active
                        steps[index - 1].active = true;
                        return true;

                    }
                    if (step.name == 'Personal Information') {
                        if (personalForm.valid) {
                            //set Personal Information step deactive and validate it
                            step.active = false;
                            step.valid = true;
                            // set the next step active
                            steps[index - 1].active = true;
                            return true;
                        }
                        else {
                            //if form is not valid then set errors and stop user to go to next step
                            step.hasError = true;
                        }
                    }
                    if (step.name == 'Address Information') {
                        if (AddressForm.valid) {
                                                        //set Address Information step deactive and validate it
                            step.active = false;
                            step.valid = true;
                            // set the next step active
                            steps[index - 1].active = true;
                            return true;
                        }
                        else {
                            //if form is not valid then set errors and stop user to go to next step                           
                            step.hasError = true;
                        }
                    }
                    if (step.name == 'wallet Information') {
                        if (WalletForm.valid) {
                            //set wallet Information step deactive and validate it
                            step.active = false;
                            step.valid = true;
                            // set the next step active
                            steps[index - 1].active = true;
                            return true;

                        }
                        else {
                            //if form is not valid then set errors and stop user to go to next step
                            step.hasError = true;
                        }
                    }
                }
            }
        });

        //set all of our forms values to an empty object to make it one JSON object for send to server
        this.details.firstname = this.personalForm.value.firstname;
        this.details.lastname = this.personalForm.value.lastname;
        this.details.birth = this.personalForm.value.birth;
        //format the birthdate for showing in HTML
        this.details.birthDate = moment(this.personalForm.value.birth).format('MM/DD/YYYY');
        this.details.phone = this.personalForm.value.phone;
        this.details.wallet = this.WalletForm.value.wallet;
        this.details.address = this.AddressForm.value.address;
        this.details.hasWallet = this.WalletForm.value.hasWallet;
        this.details.passportImage = this.PersonAx;
        this.details.image = this.SecondAx;
    }
    //any time that the Previus button in pressed this function will run
    public prev() {
        //if its the first step (welcome message) then do nothing
        if (this.steps[4].active)
            return false;
        this.steps.some(function (step, index, steps) {
            if (index != 5) {
                if (step.active) {
                    step.active = false;
                    steps[index + 1].active = true;
                    return true;
                }
            }
        });
    }

    public confirm() {
        this.steps.forEach(step => step.valid = true);

        // //console.log(this.details);
        //sending details object to updatekyc function in authService
        this.authService.updatekyc(this.details).subscribe(data => {
            //console.log(data);
            this.confirmed = true;

            let msg = data['msg'];
            let success = data['success'];

            if (success) {
                this.flashMessage.show(msg, { cssClass: 'alert-success', timeout: 3000 });
                this.dataSuccess = true;
                this.dataMsg = msg;
                //   this.router.navigate(['/login']);
            } else {
                this.flashMessage.show(msg, { cssClass: 'alert-danger', timeout: 3000 });
                this.dataSuccess = false;
                this.dataMsg = msg;
                //   this.router.navigate(['/register']);
            }
        });

    }
    public home() {
        this.router.navigate(['pages/dashboard']);
    }

    //this function will check if wallet address is a real address or not
    public isAddress(event) {

        if (!/^(0x)?[0-9a-f]{40}$/i.test(event)) {
            // document.getElementById('walletDiv').classList.add("has-danger");
            // document.getElementById('walletDiv').classList.remove("has-success");
            // check if it has the basic requirements of an address
            //console.log('not Address');
            this.WalletForm.controls['wallet'].setErrors({ 'incorrect': true });
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(event) || /^(0x)?[0-9A-F]{40}$/.test(event)) {
            // document.getElementById('walletDiv').classList.remove("has-danger");
            // document.getElementById('walletDiv').classList.add("has-success");
            // If it's all small caps or all all caps, return true
            //console.log('address');
            // this.haveImg=true;
            return true;
        }
        //console.log(event);

    }



}
