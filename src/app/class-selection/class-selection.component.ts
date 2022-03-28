import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { RegisterStudentForClassService } from '../services/registerStudentForClass/register-student-for-class.service';
import { AvailableClassesComponent } from './available-classes/available-classes.component'
@Component({
  selector: 'app-class-selection',
  templateUrl: './class-selection.component.html',
  styleUrls: ['./class-selection.component.css']
})
export class ClassSelectionComponent implements OnInit {

  finalData = <any>{};
  
  allAvailableCourses:{courseId: number,courseName: string}[] = [];
  

  constructor(private registerStudentForClassService:RegisterStudentForClassService) { 
    console.log("Constructor...");
    this.allAvailableCourses = [{courseId:1,courseName:'Algebra'},{courseId:2,courseName:'Trigonmetry'}];
  }


  ngOnInit(){
    console.log("CLASS");
    
  }

  registerStudentForClass(studentId: number, courseId: number){

    this.finalData = {
			function: "registerStudentForClass",
			studentId: studentId,
			courseId: courseId
		}

    console.log(this.finalData);
		
		this.registerStudentForClassService.create(this.finalData).subscribe((res:any) => {
			 console.log('Student successfully registered for class!');
			 
		})

  }


}
