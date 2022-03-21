import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isloggedin:boolean = false;
  //private currentUserSubject: BehaviorSubject<any>;
  //public currentUser: Observable<any>;

  private apiURL = "/~educationrevival/backend/index.php";
	
	/*------------ Http Header Options ----------*/
	httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type': 'application/json'
		})
	}

  constructor(private http: HttpClient) { 
    //this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || 'Default Value'));
    //this.currentUser = this.currentUserSubject.asObservable();
}

/*
public get currentUserValue() {
  return this.currentUserSubject.value;
}
*/

isLoggedIn(){
  const user = JSON.parse(localStorage.getItem('currentUser')!);
  console.log("user",user)
    return user !== null ? true : false;
}

  login(auth:Auth) {
    return this.http.post<any>(this.apiURL, JSON.stringify(auth), this.httpOptions)
        .pipe(map(user => {
            if(user.status==="success"){

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;

            }else{
              return false;
            }
        }));
  }
}


