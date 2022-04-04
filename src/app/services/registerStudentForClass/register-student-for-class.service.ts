import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RegisterStudentForClass, IsStudentRegisteredForClass, AllAvailabaleClasses, ListOfCurrentClasses, ActualAndTotalPossibleScores, CompletedAndTotalModules } from './register-student-for-class';

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

	isStudentRegisteredForClass(isStudentRegisteredForClass: IsStudentRegisteredForClass): Observable<any> {
		return this.httpClient.post(this.apiURL , JSON.stringify(isStudentRegisteredForClass), this.httpOptions)
	  
		.pipe(
		  catchError(this.errorHandler)
		)
	}

	getAllAvailableClasses(allClasses: AllAvailabaleClasses): Observable<any> {
		return this.httpClient.post(this.apiURL , JSON.stringify(allClasses), this.httpOptions)
	  
		.pipe(
		  catchError(this.errorHandler)
		)
	}

	getListOfCurrentClasses(listOfCurrentClasses: ListOfCurrentClasses): Observable<any> {
		return this.httpClient.post(this.apiURL , JSON.stringify(listOfCurrentClasses), this.httpOptions)
	  
		.pipe(
		  catchError(this.errorHandler)
		)
	}

	getActualAndTotalPossibleScores(actualAndTotalPossibleScores: ActualAndTotalPossibleScores): Observable<any> {
		return this.httpClient.post(this.apiURL , JSON.stringify(actualAndTotalPossibleScores), this.httpOptions)
	  
		.pipe(
		  catchError(this.errorHandler)
		)
	}

	getCompletedAndTotalModules(completedAndTotalModules: CompletedAndTotalModules): Observable<any> {
		return this.httpClient.post(this.apiURL , JSON.stringify(completedAndTotalModules), this.httpOptions)
	  
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
