import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { UserService } from '../user.service';
import {HttpClient} from '@angular/common/http';

/* HeaderComponent is the header element that displays at the top of
 * each page and has log out functionality as well as search and a
 * logo that links back home.
 */

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn : boolean = false;
  constructor(private route: ActivatedRoute,private router:Router,private user:UserService, private http:HttpClient) { }

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      if(event instanceof NavigationEnd ){
        if(this.router.url != "/home" && this.router.url != "/membersearch"){
          this.loggedIn = false;
        } else {
          this.loggedIn = true;
        }
      }
    })
  }
}