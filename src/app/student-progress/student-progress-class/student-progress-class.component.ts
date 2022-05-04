import { Component, Input, ViewChild, OnInit, ElementRef, Renderer2, AfterViewInit, AfterContentInit, EventEmitter, Output  } from '@angular/core';
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
  reqPayload2  = <any>{};
  reqPayload3  = <any>{};
  reqSegmentValues  = <any>{};
  
  courseid:number | undefined;
  SegmentId:number | undefined
  TotalScorePossible:number = 0;
  TotalScore:number = 0;
  LastCompletedModule:number = 0;
  NumberOfGradedModules:number = 0;
  coursename: string = "";
  courseStarted:boolean = false;
  getScoreValue: string | undefined;
  VideoAddress: string = "";
  StartingMessage: string = "";
  getProgressBarValue: string | undefined;
  getProgressBarStyleWidth: number | undefined;
  getProgressBarAreaValueNow: number | undefined;
  getVideoSourceTag: string | undefined;
  
  @ViewChild("divCourseName") divCourseName?: ElementRef;
  @ViewChild("divScoreValue") divScoreValue?: ElementRef;
  @ViewChild("videoModalTempRef") videoModalTempRef?: ElementRef;
  @ViewChild("videoTag") videoTag?: ElementRef;
  
  
  @Output() onVideoClicked = new EventEmitter<any>();
  @Output() onGetSubjectName = new EventEmitter<any>();
  @Output() onGetCourseId = new EventEmitter<any>();
  @Output() onGetSegmentId = new EventEmitter<any>();
  
  
  constructor(private renderer: Renderer2, 
              private registerStudentForClassService:RegisterStudentForClassService,
              private elem:ElementRef
              ){
    //this.isLoading = true;
  }

  ngOnInit(){
   
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

    this.reqPayload3 = {
      function: "getNextSegment",
      studentId: user.userId,
      courseId: this.courseid
    };
    
    this.registerStudentForClassService.getNextSegment(this.reqPayload3).subscribe((res:any) => {
      
      this.SegmentId = res.segmentId;

      this.reqPayload2 = {
        function: "getVideo",
        segmentId: res.segmentId,
        courseId: this.courseid
      };
     
      this.registerStudentForClassService.getVideo(this.reqPayload2).subscribe((res:any) => {
        console.log(res);
        this.VideoAddress = res.videoAddress
      });
   });

  }

  ngAfterViewInit(){

    this.coursename = this.courseobj.courseName;
    this.courseStarted = this.courseobj.started;
    const divCourseNameH3TagHTML = '<h3 class="class-name">'+this.coursename+'</h3>'
    this.renderer.setProperty(this.divCourseName?.nativeElement,'innerHTML', divCourseNameH3TagHTML);
  
  }

  ngAfterContentInit(){
    //this.isLoading = false;
  }

  showVideo(){
    //console.log(this.VideoAddress);
    this.onVideoClicked.emit(this.VideoAddress);
    this.onGetSubjectName.emit(this.courseobj.courseName);
    this.onGetCourseId.emit(this.courseid);
    this.onGetSegmentId.emit(this.SegmentId);
  }
  
}
