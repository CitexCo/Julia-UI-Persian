import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from "./guards/auth.guard";
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ForgetPassResetComponent } from "./pages/forget-pass-reset/forget-pass-reset.component";
export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate:[AuthGuard] },
  { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
  { path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule' },
  { path:'forgetPassReset', component:ForgetPassResetComponent},
  { path:'forgetPass', loadChildren:'app/pages/forget-pass/forget-pass.module#ForgetPassModule'},
  { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
   useHash: true
});