import { Component, OnInit } from '@angular/core';
import { RegisterStudentForClassService } from '../services/registerStudentForClass/register-student-for-class.service';

@Component({
  selector: 'app-student-progress',
  templateUrl: './student-progress.component.html',
  styleUrls: ['./student-progress.component.css']
})
export class StudentProgressComponent implements OnInit {

  reqPayload = <any>{};
  listOfCurrentClasses: {courseId: number,courseName: string, numberOfGradedModules: number}[] = [];

  constructor(private registerStudentForClassService:RegisterStudentForClassService) { }

  ngOnInit(){

    const user = JSON.parse(localStorage.getItem('currentUser')!);

    this.reqPayload = {
      function: "getListOfCurrentClasses",
      studentId: user.userId
    };
    this.registerStudentForClassService.getListOfCurrentClasses(this.reqPayload).subscribe((res:any) => {
      console.log("TEST=",res)   
      res.forEach((item:any) => {
            this.listOfCurrentClasses.push(item);
         });
    });

  }

}
