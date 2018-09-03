import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MemberObject } from './memberobject';
import "rxjs/add/observable/of";  // For RxJs  5.0+


@Injectable()
export class UserService {

  private errorMessage;

  constructor(private http:HttpClient, private router:Router) { 
    this.errorMessage = ' ';
  }

  // Functions for setting error message
  setUserLoggedInErrorMessage(message) {
  	this.errorMessage = message;
  }

  getUserLoggedInErrorMessage() {
  	return this.errorMessage;
  }

  initAll(){
    this.errorMessage = ' ';
  }

  getUser() {
    return this.http.post('/getUserInfo',{});
  }

  // For logging out
  logOutCurrentUser(){
    this.getUser().subscribe((res) => {
      this.http.post('/logout',{}).subscribe(data => {
        this.router.navigate(['/']);
      });
    })
  }
}