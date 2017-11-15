import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { environment } from "../../../environments/environment"



import { Session, UserLogin, ISession, User, ReadedDocs } from "./session.model"


@Injectable()
export class SessionService {

  session: Session;
  readedDocs: ReadedDocs;

  private stringSessionKey: string;
  private stringReadedDocs: string;

  showFooter : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: Http) {


     
    /**
     *  Session interwebsessionkey  tarayıcıda bulunan  localstorage üzerinde interwebsessionkey tutulur.
     */
    this.loadSessionData();
    this.loadReadedDocsData();

  }
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;






  private loadSessionData() {
    this.stringSessionKey = "interwebsessionkey";

    var localSession: any;
    localSession = localStorage.getItem(this.stringSessionKey)
    if (localSession) {

      this.session = JSON.parse(localSession);

      this.setHttpHeader();

    }
    else {
      this.session = Session.initialSession();
    }

    if (this.session.token) {
      this.isLoggedIn = true;
      if (this.session.expires <= new Date()) {
        this.remove();
        this.isLoggedIn = false;
      }


    }
  }


  private setHttpHeader = function () {

    this.http._defaultOptions.headers.delete('Authorization');


    this.http._defaultOptions.headers.append('Authorization', 'Bearer ' + this.session.token);
    this.http._defaultOptions.headers.append('Content-Type', 'application/json;charset=UTF-8');

  };

  private removeHttpHeader = function () {
    this.http._defaultOptions.headers.delete('Authorization');
  };

  public addHttpHeader = function (key: string, value: string) {
    this.http._defaultOptions.headers.append(key, value);
  };

  public deleteHttpHeader = function (key: string) {
    this.http._defaultOptions.headers.delete(key);
  };





  /**
   * localstorage üzerinde bulunan session key silinir ve isloggedin=false yapılır bundan  dolayı angular login sayfalarına yönlendirme yapar.
   */
  remove(): void {
    this.isLoggedIn = false;
    localStorage.removeItem(this.stringSessionKey)
    this.removeHttpHeader();

  }

  set(sessionItem: ISession): void {
    this.isLoggedIn = true;

    localStorage.setItem(this.stringSessionKey, JSON.stringify(sessionItem));
    this.loadSessionData();
  }

  private loadReadedDocsData() {
    this.stringReadedDocs = "interwebReadedDocs"

    var localReadedDocsData: any;

    localReadedDocsData = localStorage.getItem(this.stringReadedDocs)
    if (localReadedDocsData) {

      this.readedDocs = JSON.parse(localReadedDocsData);
    }
    else {
      this.readedDocs = ReadedDocs.initialReadedDocs();
    }

    if (this.readedDocs.expires) {
      if (this.readedDocs.expires <= new Date()) {
        this.removeReadedDocs();
      }
    }
    else {
    }
  }

  removeReadedDocs() {
    localStorage.removeItem(this.stringReadedDocs);
  }

  setReadedDocuments(readedDocs: ReadedDocs): void {
    localStorage.setItem(this.stringReadedDocs, JSON.stringify(readedDocs));

  }
}

