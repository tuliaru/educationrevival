import { Component, Input, ViewChild, OnInit, ElementRef, Renderer2, AfterViewInit, AfterContentInit  } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterStudentForClassService } from 'src/app/services/registerStudentForClass/register-student-for-class.service';

@Component({
  selector: 'app-student-progress-class',
  templateUrl: './student-progress-class.component.html',
  styleUrls: ['./student-progress-class.component.css']
})
export class StudentProgressClassComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Input() courseobj: any;
  isLoading: boolean = false;
  reqPayload  = <any>{};
  reqPayload1  = <any>{};
  courseid:number | undefined;
  TotalScorePossible:number = 0;
  TotalScore:number = 0;
  LastCompletedModule:number = 0;
  NumberOfGradedModules:number = 0;
  coursename: string = "";
  courseStarted:boolean = false;
  getScoreValue: string | undefined;
  getProgressBarValue: string | undefined;
  getProgressBarStyleWidth: number | undefined;
  getProgressBarAreaValueNow: number | undefined;

  displayStyle = "none";

  @ViewChild("divCourseName") divCourseName?: ElementRef;
  @ViewChild("divScoreValue") divScoreValue?: ElementRef;
  @ViewChild("videoModalTempRef") videoModalTempRef?: ElementRef;

  
  constructor(private renderer: Renderer2, 
              private registerStudentForClassService:RegisterStudentForClassService,
              private SpinnerService: NgxSpinnerService,
              private elem:ElementRef
              ){
    //this.isLoading = true;
  }

  ngOnInit(){
    this.SpinnerService.show(); 
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    this.courseid = this.courseobj.courseId;
    
    this.reqPayload1 = {
      function: "getCompletedAndTotalModules",
      studentId: user.userId,
      courseId: this.courseid
    };

    this.registerStudentForClassService.getCompletedAndTotalModules(this.reqPayload1).subscribe((res:any) => {
      
      this.LastCompletedModule = res.lastCompletedModule;
      this.NumberOfGradedModules = res.numberOfGradedModules;
      this.getProgressBarValue = this.LastCompletedModule+'/'+this.NumberOfGradedModules;
      this.getProgressBarStyleWidth = Math.round((this.LastCompletedModule/this.NumberOfGradedModules)*100);
      this.getProgressBarAreaValueNow = this.getProgressBarStyleWidth;
      
    });
    
    this.reqPayload = {
      function: "getActualAndTotalPossibleScores",
      studentId: user.userId,
      courseId: this.courseid
    };
    this.registerStudentForClassService.getActualAndTotalPossibleScores(this.reqPayload).subscribe((res:any) => {
      this.TotalScore = res.totalScore;
      this.TotalScorePossible = res.totalScorePossible;
      this.getScoreValue = this.TotalScorePossible+'/'+this.TotalScore;
      const getActualAndTotalPossibleScoresValueHTML = '<div class="score-label">Score ( '+this.getScoreValue+' )</div>'
      this.renderer.setProperty(this.divScoreValue?.nativeElement,'innerHTML', getActualAndTotalPossibleScoresValueHTML);
    });

  }

  ngAfterViewInit(){

    this.coursename = this.courseobj.courseName;
    this.courseStarted = this.courseobj.started;
    const divCourseNameH3TagHTML = '<h3 class="class-name">'+this.coursename+'</h3>'
    this.renderer.setProperty(this.divCourseName?.nativeElement,'innerHTML', divCourseNameH3TagHTML);
    this.SpinnerService.hide();

    
  }

  ngAfterContentInit(){
    //this.isLoading = false;
    
  }

  openModal(){
    //this.elem.nativeElement.querySelector('#videosModal').modal('show');

    this.displayStyle = "block";


  }

}
