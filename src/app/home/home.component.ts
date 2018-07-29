import { Component, OnInit } from '@angular/core';
import { MemberObject } from '../memberobject'
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Data
  allMembers:any[];
  name="";
  num="";
  phone="";
  date="";

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.allMembers = [new MemberObject("Justin", "12345678", "4089921767", Date()), 
    new MemberObject("Dominic", "876543231", "5101231234", Date()),
    new MemberObject("Patrick", "151235552", "6262348812", Date())]
    // this.http.post('/getAllMembers', {}).subscribe(res => {
    //   this.allMembers = res as MemberObject[];
    // })
  }
}