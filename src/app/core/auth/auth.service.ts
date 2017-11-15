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

import { SessionService } from "./session.service"
import { Session, UserLogin, ISession, User, ReadedDocs } from "./session.model"

import { DataService } from "../services/data.service"

/**
 *   Kullanıcı Auth işlemleri buradan yapılır. 
 * 
 *   Kullanıcı login ve logout işlemleri.
 * 
 *    Login olan kullanıcının  session açılması  ve bu session silinmesi şeklinde.
 * 
 *    Session oluşturulurken  taryıcı üzerinde bulunan localstorage kullanılır. Belki cookie üzerine de taşınabilir.
 * 
 * 
 */
@Injectable()
export class AuthService {



  /**
  *  Sınıf init edildiğinde daha önce sisteme daha önce login olan kullanıcının  bilgileri localstorage üzerinden çekilerek session var ise set edilir ve session açılır.
  * 
  * @param dataService    data servisi içeri alınır angular da bulunan singelton konsept.
  */
  constructor(private dataService: DataService, private http: Http, private sessionService: SessionService) {


  }
  // store the URL so we can redirect after logging in
  redirectUrl: string;


  /**
   *  api ile haberleşip kullanıcı adı şifre girişi yapar. bilgiler doğru ise kullanıcı login olur ve session açılır.
   * 
   * @param username  kullanıcı adı 
   * @param password  şifre 
   */
  login(username: string, password: string, lang: any): Observable<boolean> {


    var model: UserLogin = { password: password, username: username, grant_type: 'password' };

    return this.dataService.post("grant_type=password&password=" + model.password + "&username=" + model.username, "token").map((response: Response) => {
      var respo: any = response as any;

      var user: User = {
        userName: respo.userName,
        userId: respo.userId,
        customerId: respo.customerId,
        customerIdEnc: respo.customerIdEnc,
        lang: lang
      }


      var expires = new Date(respo[".expires"]);

      var rights = JSON.parse(respo.rights);

      var sessionItem: ISession = {
        token: respo.access_token,
        expires: expires,
        rights: rights,
        loading: true,
        hasError: false,
        user: user,
        token_type: "bearer"
      };

      var readedDocs: ReadedDocs = {
        expires: null,
        readedDocuments: []
      };


      this.sessionService.set(sessionItem);


      return true;

    });
  }


  /**
   * localstorage üzerinde bulunan session key silinir ve isloggedin=false yapılır bundan  dolayı angular login sayfalarına yönlendirme yapar.
   */
  logout(): void {
    this.sessionService.remove();

  }

}

