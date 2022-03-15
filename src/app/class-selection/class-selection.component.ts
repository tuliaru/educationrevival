import { Component, OnInit } from '@angular/core';
import { RegisterStudentForClassService } from '../services/registerStudentForClass/register-student-for-class.service';

@Component({
  selector: 'app-class-selection',
  templateUrl: './class-selection.component.html',
  styleUrls: ['./class-selection.component.css']
})
export class ClassSelectionComponent implements OnInit {

  finalData = <any>{};

  constructor(private registerStudentForClassService:RegisterStudentForClassService) { }

  ngOnInit(): void {
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
