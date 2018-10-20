import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';


import { AdminUserListComponent } from './admin/admin-user-list/admin-user-list.component';
import { ReferalComponent } from './user/referal/referal.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

import { UsersListComponent } from './admin/users-list/users-list.component';
import { UserBurnComponent } from './user/user-burn/user-burn.component';
import { ExchangerUserListComponent } from './exchanger/exchanger-user-list/exchanger-user-list.component';

import { AminBuysComponent } from './admin/amin-buys/amin-buys.component';
import { AdminBurnComponent } from './admin/admin-burn/admin-burn.component';
import { AddAdminComponent } from './admin/addUser/add-admin/add-admin.component';
import { AddExchangerComponent } from './admin/addUser/add-exchanger/add-exchanger.component';
import { UserBuyComponent } from './user/user-buy/user-buy.component';
import { UserBuyHistoryComponent } from './user/user-buy-history/user-buy-history.component';
import { ExchangerDetailsComponent } from './exchanger/exchanger-details/exchanger-details.component';
import { UserBurnHistoryComponent } from './user/user-burn-history/user-burn-history.component';
import { ExchangerHistoryListComponent } from './exchanger/exchanger-history-list/exchanger-history-list.component';
import { AdminTransferComponent } from './admin/admin-transfer/admin-transfer.component';
import { SetPriceComponent } from './admin/set-price/set-price.component'
export const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'dashboard', pathMatch:'full' },
            { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' }  },          
          

            { path: 'KYC', loadChildren: 'app/pages/kyc/form-elements.module#FormElementsModule', data: { breadcrumb: 'Form Elements' } },

            { path: 'ChangeRole', component:AdminUserListComponent, data: { breadcrumb: 'Change Role' } },
            { path: 'UserList', component:UsersListComponent, data: { breadcrumb: 'Users List' } },
            { path: 'referal', component:ReferalComponent, data: { breadcrumb: 'Referals' } },
            { path: 'UserBuy', component:UserBuyComponent, data: { breadcrumb: 'user Burn' } }, 
            { path: 'UserBuyHistory', component:UserBuyHistoryComponent, data: { breadcrumb: 'user Burn' } }, 
            { path: 'UserBurn', component:UserBurnComponent, data: { breadcrumb: 'user Burn' } },  
            { path: 'adminBuys', component:AminBuysComponent, data: { breadcrumb: 'Admin Buys' } }, 
            { path: 'adminBurn', component:AdminBurnComponent, data: { breadcrumb: 'Admin Buys' } }, 
            { path: 'ExchangerUserList', component:ExchangerUserListComponent, data: { breadcrumb: 'Exchanger User List' } },
            { path: 'resetPass', component:ResetPassComponent, data: { breadcrumb: 'Reset Password' } },             
            { path: 'ticketing', loadChildren: 'app/pages/ticketing/ticketing.module#TicketingModule', data: { breadcrumb: 'Ticketing' } },
            { path: 'addAdmin', component:AddAdminComponent, data: { breadcrumb: 'Reset Password' } },   
            { path: 'addExchanger', component:AddExchangerComponent, data: { breadcrumb: 'Reset Password' } },   
            { path: 'exchangerDetails', component:ExchangerDetailsComponent, data: { breadcrumb: 'Reset Password' } }, 
            { path: 'UserBurnHistory', component:UserBurnHistoryComponent, data: { breadcrumb: 'Reset Password' } }, 
            { path: 'ExchangerHistoryList', component:ExchangerHistoryListComponent, data: { breadcrumb: 'Reset Password' } }, 
            { path: 'adminTransfer', component:AdminTransferComponent, data: { breadcrumb: 'Reset Password' } }, 
            { path: 'setPrice', component:SetPriceComponent, data: { breadcrumb: 'Reset Password' } },
       ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);