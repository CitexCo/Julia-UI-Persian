import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { CKEditorModule } from 'ng2-ckeditor';
import { DirectivesModule } from '../../theme/directives/directives.module';




import { KycUserComponent } from './KYCuser/kycUser.component';
import { KycAdminComponent } from "./KYCadmin/kycAdmin.component";

import {MatNativeDateModule,MatButtonModule, MatCheckboxModule,MatFormFieldModule, MatGridListModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
export const routes = [
  { path: '', redirectTo: 'UserKYC', pathMatch: 'full'},


  { path: 'UserKYC', component: KycUserComponent, data: { breadcrumb: 'KYC' } },
  { path: 'AdminKYC', component: KycAdminComponent, data: { breadcrumb: 'KYC' } },

];

@NgModule({
  imports: [
    MatButtonModule, MatGridListModule, MatCheckboxModule,MatExpansionModule,MatFormFieldModule,MatDialogModule,MatRadioModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    NgbModule,
    CustomFormsModule,
    CKEditorModule,
    DirectivesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [



    KycUserComponent,
    KycAdminComponent,

  ]
})
export class FormElementsModule { }
