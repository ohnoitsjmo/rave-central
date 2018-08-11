import { Component, OnInit } from '@angular/core';
import { MemberObject } from '../memberobject'
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {

  //Data
  allMembers:any[];
  name="";
  mail="";
  membernum="";
  expdate="";

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.post('/queryUser', {}).subscribe(res=>{
      this.allMembers = res['users'] as MemberObject[]; 
      console.log(this.allMembers)
    })
  }
}