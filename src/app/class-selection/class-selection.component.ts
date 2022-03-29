import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { RegisterStudentForClassService } from '../services/registerStudentForClass/register-student-for-class.service';

@Component({
  selector: 'app-class-selection',
  templateUrl: './class-selection.component.html',
  styleUrls: ['./class-selection.component.css']
})
export class ClassSelectionComponent implements OnInit {

  reqPayload = <any>{};
  
  allAvailableCourses:{courseId: number,courseName: string, numberOfGradedModules: number}[] = [];
  

  constructor(private registerStudentForClassService:RegisterStudentForClassService) {}

  ngOnInit(){
    this.reqPayload = {
      function: "getAllClasses"
    };
    this.registerStudentForClassService.getAllAvailableClasses(this.reqPayload).subscribe((res:any) => {
      console.log(res)   
      res.forEach((item:any) => {
            this.allAvailableCourses.push(item);
         });
    });
  }
  

}
