import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService} from './user.service';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthguardGuard implements CanActivate {
	constructor(private user: UserService, private router:Router, private http:HttpClient) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
        return new Promise<boolean>(resolve => {
          this.http.post('/authenticate',{}).subscribe(data => {
             if(data['isAuthenticated'] == true) {
               resolve(true);
             } else {
               this.router.navigate(['/'], {
                 queryParams: {
                   return: state.url
                 }
               });
               this.user.setUserLoggedInErrorMessage('Not logged in Please login to continue');
               resolve(false);
             }
          });
      });
   }
}