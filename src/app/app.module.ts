import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';


import { routing } from './app.routing';
import { AppSettings } from './app.settings';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';

import { AuthService } from "./services/auth-service.service";
import { AuthGuard } from "./guards/auth.guard";
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ForgetPassResetComponent } from "./pages/forget-pass-reset/forget-pass-reset.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from "./../environments/environment";
import { ImgService } from "./services/img.service";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ForgetPassResetComponent,

  ],
  imports: [
    MatButtonModule, MatCheckboxModule,MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
    }),

    routing
  ],
  providers: [ AppSettings,AuthService,AuthGuard,ImgService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
