import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RegisterStudentForClassService } from '../services/registerStudentForClass/register-student-for-class.service';

@Component({
  selector: 'app-student-progress',
  templateUrl: './student-progress.component.html',
  styleUrls: ['./student-progress.component.css']
})
export class StudentProgressComponent implements OnInit {

  VideoAddress: string = "";
  getVideoSourceTag: string | undefined;
  reqPayload = <any>{};
  listOfCurrentClasses: {courseId: number,courseName: string, numberOfGradedModules: number}[] = [];
  @ViewChild("videoTag") videoTag?: ElementRef;
  
  constructor(private renderer: Renderer2, 
              private registerStudentForClassService:RegisterStudentForClassService, 
              private elem:ElementRef) { }

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

  doSomething1(videoAddress: any):void {
    
        this.VideoAddress =  "http://209.59.175.99/~educationrevival/videos/"+videoAddress;
        this.getVideoSourceTag = '<source src="'+this.VideoAddress+'" type="video/mp4" >';
        this.renderer.setProperty(this.videoTag?.nativeElement,'innerHTML', this.getVideoSourceTag);
        this.videoTag?.nativeElement.load();
  }

  doSomething2(courseName: any):void {
      this.elem.nativeElement.querySelector('#videosModal .modal-header h2').innerHTML = courseName;
  }

}
