import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Registration } from './registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

	private apiURL = "http://209.59.175.99/~educationrevival/backend/index.php";
	
	/*------------ Http Header Options ----------*/
	httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type': 'application/json'
		})
	}

	constructor(private httpClient: HttpClient) { }
	
	create(registration:Registration): Observable<any> {
  
		return this.httpClient.post(this.apiURL , JSON.stringify(registration), this.httpOptions)
	  
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
