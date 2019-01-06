import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Blog } from '../model/blog';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  h1Style: boolean = false;
  users: Blog[];

  constructor(private data: DataService) { }

  ngOnInit() {
      this.data.getUsers().subscribe(users => {
        this.users = users;
        console.log(this.users);
      }
    );
    //this.h1Style = false;
    //this.users = this.data.getUsers();
  }

  

}
