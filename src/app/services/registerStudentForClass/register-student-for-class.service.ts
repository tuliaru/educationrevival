import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RegisterStudentForClass } from './register-student-for-class';

@Injectable({
  providedIn: 'root'
})
export class RegisterStudentForClassService {

  //private apiURL = "http://209.59.175.99/~educationrevival/backend/index.php";
  private apiURL = "/~educationrevival/backend/index.php";
	
	/*------------ Http Header Options ----------*/
	httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type': 'application/json'
		})
	}

	constructor(private httpClient: HttpClient) { }
	
	create(registerStudentForClass:RegisterStudentForClass): Observable<any> {
  
		return this.httpClient.post(this.apiURL , JSON.stringify(registerStudentForClass), this.httpOptions)
	  
		.pipe(
		  catchError(this.errorHandler)
		)
	}
	
	errorHandler(error:any) {
		let errorMessage = '';
		if(error.error instanceof ErrorEvent) {
		  errorMessage = error.error.message;
		} else {
		  errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		return throwError(errorMessage);
	}
}
