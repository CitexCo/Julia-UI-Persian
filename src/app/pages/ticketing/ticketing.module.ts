import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserTicketComponent } from './user-ticket/user-ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketStateComponent } from './ticket-state/ticket-state.component';
import { AdminTicketComponent } from './admin-ticket/admin-ticket.component';
import { AdminTicketListComponent } from './admin-ticket-list/admin-ticket-list.component';
import { AdminTicketStateComponent } from './admin-ticket-state/admin-ticket-state.component';
import { MatPaginatorModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';

export const routes = [
  { path: 'UserTicket', component: UserTicketComponent, pathMatch: 'full' },
  { path:'TicketList', component:TicketListComponent, pathMatch: 'full'},
  { path:'TicketState', component:TicketStateComponent, pathMatch: 'full'},
  { path:'AdminTicket', component:AdminTicketComponent, pathMatch:'full'},
  { path:'AdminTicketList', component:AdminTicketListComponent,pathMatch:'full' },
  { path:'AdminTicketState', component:AdminTicketStateComponent,pathMatch:'full' },
];

@NgModule({
  imports: [
    MatTableModule,MatPaginatorModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserTicketComponent, TicketListComponent, TicketStateComponent, AdminTicketComponent, AdminTicketListComponent, AdminTicketStateComponent]
})

export class TicketingModule { }