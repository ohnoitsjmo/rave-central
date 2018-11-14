import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './authguard.guard';
import { UserService } from './user.service';
import {DataTableModule} from "angular-6-datatable";

const appRoutes:Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent, 
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    NgxSpinnerModule,
    DataTableModule
  ],
  entryComponents : [
  ],
  providers: [
    UserService,
    AuthguardGuard,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
