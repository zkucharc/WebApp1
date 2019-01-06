import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Blog } from '../model/blog';
//import { MessageService } from '../message.service';




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;
  users: Blog[];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private data: DataService) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      blogId: ['', Validators.required],
      url: ['', Validators.required]
    });

    this.data.getUsers().subscribe(users => {
        this.users = users;
        console.log(this.users);
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
        return;
    }

    this.success = true;

    let formObj = this.messageForm.getRawValue(); // {name: '', description: ''}

    let serializedForm = JSON.stringify(formObj);
    let test = new Object();
    let headers1 = new HttpHeaders().append('Content-Type', 'application/json; charset=utf-8');

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': 'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since',
        'Content-Type': 'application/json',
        'Accept': 'application/json'        
      })
    };

    //let options = new RequestOptions({ httpOptions });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    //let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    this.http.post('http://localhost:63245/api/values', serializedForm,httpOptions)
            .subscribe(
                data => console.log("success!", data),
                error => console.error("couldn't post because", error)
            );

      //this.http.post<object>("http://localhost:63245/api/values/", formObj, httpOptions).pipe(
      //tap((hero: object) => this.log(`added hero`)),
      //catchError(this.handleError<object>('addHero'))
    //);
  }

  private log(message: string) {
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
