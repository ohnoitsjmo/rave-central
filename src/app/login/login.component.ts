import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {UserService} from '../user.service';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { AppComponent } from '../app.component';

/* LoginComponent is the page where users authenticate
 * their credentials with the LDAP server.
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  serverMessage = "";
  isAuth:boolean;
  
  constructor(private route: ActivatedRoute, private router:Router, private user:UserService, private http:HttpClient, private app:AppComponent) {}

  ngOnInit() { 
    this.http.post('/authenticate',{}).toPromise().then((result) => {
      if(result['isAuthenticated'] == true){
        this.router.navigate(['home']);
      }
     });
  }

  authenticateCurrentUser(e){
    e.preventDefault();
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    var loginObject = {username : username, password: password};
    var response = this.http.post('/authenticate', loginObject).subscribe(data => {
      console.log(data);
      if(data['isAuthenticated'] == true) {
        this.route.queryParams.subscribe((params: Params) => {
          if (params['return']) {
            this.router.navigate([params['return']]);
          } else {
            this.router.navigate(['home']);
          }
        });
      } else {
        this.user.setUserLoggedInErrorMessage('Invalid Credentials');
      }
    });
  }
}