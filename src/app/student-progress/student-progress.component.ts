import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';


import { RegisterStudentForClassService } from '../services/registerStudentForClass/register-student-for-class.service';

@Component({
  selector: 'app-student-progress',
  templateUrl: './student-progress.component.html',
  styleUrls: ['./student-progress.component.css']
})
export class StudentProgressComponent implements OnInit {

  reqPayload1  = <any>{};
  reqPayload2  = <any>{};
  reqPayload3  = <any>{};
  
  VideoAddress: string = "";
  videoName: string = "";
  courseId!: number; 
  segmentId!: number;
  closeStatus!:boolean;
  //counterValue!: any;
  //counterValue2!: any;
  getVideoSourceTag: string | undefined;
  OkButtonTimeModalClearTimeout: any;
  totalQuestionNo!: number;
  
  listOfCurrentClasses: {courseId: number, courseName: string, numberOfGradedModules: number}[] = [];
  listOfQuestionsData: {questionNumber: number, typeOfQuestion: number, questionLabel: string, questionData: any}[] = [];

  DataForm: FormGroup = new FormGroup({});
  questionNumber!: FormGroup 
  nameField = new FormControl("");
  reqPayload4 = <any>{};

  counter2 = 60;
  interval2 = 1000;

  counter3Value = 60;
  counter3 = this.counter3Value;
  interval3 = 1000;

  myTimer:any;
  mySegmentTimer:any;

  minutes!: number;
  seconds!: number;
  
  minutes1!: number;
  seconds1!: number;

  @ViewChild("videoTag") videoTag?: ElementRef;
  @ViewChild("hiddenButtonTimeModal") hiddenButtonTimeModal?: ElementRef;
  @ViewChild("OkButtonTimeModal") OkButtonTimeModal?: ElementRef;
  @ViewChild("CloseButtonTimeModal") CloseButtonTimeModal?: ElementRef;
  
  
  constructor(private renderer: Renderer2, 
              private registerStudentForClassService:RegisterStudentForClassService, 
              private elem:ElementRef,
              private fb: FormBuilder
              ) {
                //this.questionNumber = this.fb.group({questionNumber: ''});
                //this.DataForm = this.generateFormControls(this.listOfQuestionsData);
              }
  

  ngOnInit(){

      const user = JSON.parse(localStorage.getItem('currentUser')!);

      this.reqPayload1 = {
        function: "getListOfCurrentClasses",
        studentId: user.userId
      };
      this.registerStudentForClassService.getListOfCurrentClasses(this.reqPayload1).subscribe((res:any) => {
       res.forEach((item:any) => {
              this.listOfCurrentClasses.push(item);
          });
      });


  }
  
  StopTimerModal(){
    
    clearInterval(this.myTimer);
    this.minutes = 0;
    this.seconds = 0;
    this.counter2 = 60;
    this.counter3 = this.counter3Value;
    //console.log("counter2="+this.counter2);

  }

  show(){
    this.startTimer()
  }

  show1(){
      this.StopTimerModal();
      this.startSegmentTimer();
  }

  show2(index:number){
    console.log("show2");
    clearInterval(this.mySegmentTimer);
    if(index == (this.totalQuestionNo - 1))
    {
      console.log("OK Close index1="+index);
      this.elem.nativeElement.querySelector('#assesmentqtypeOneModalClose'+index).click();
      console.log("OK Close index2="+index);
      this.closeStatus = true;
    }
    this.counter3 = this.counter3Value;
    this.seconds1 = 0;
    this.startSegmentTimer();
}

  vidEnded(){
      //console.log("VIDEO FINISHED="+this.counter);

      const user = JSON.parse(localStorage.getItem('currentUser')!);
      
      this.reqPayload2 = {
        function: "isAssessmentGiven",
        studentId: user.userId,
        segmentId: this.segmentId,
        courseId: this.courseId
    };
    

      this.registerStudentForClassService.isAssessmentGiven(this.reqPayload2).subscribe((res:any) => {
        if(res.result){
          this.hiddenButtonTimeModal?.nativeElement.click();
        }
      });

    this.reqPayload3 = {
        function: "getSegmentAssessment",
        segmentId: this.segmentId,
        courseId: this.courseId
    };


    this.registerStudentForClassService.getSegmentAssessment(this.reqPayload3).subscribe((res:any) => {
      //console.log(res);
      this.listOfQuestionsData = [];
      this.totalQuestionNo = res.length;
      
      res.forEach((item:any) => {
      this.listOfQuestionsData.push(item);
      });

      console.log(this.listOfQuestionsData);

    });

    

  }

  
  doSomething1(videoAddress: any):void {

          //console.log(videoAddress);
          this.VideoAddress =  "http://209.59.175.99/~educationrevival/videos/"+videoAddress;
          this.getVideoSourceTag = '<source src="'+this.VideoAddress+'" type="video/mp4" >';
          this.renderer.setProperty(this.videoTag?.nativeElement,'innerHTML', this.getVideoSourceTag);
          this.videoTag?.nativeElement.load();
  }

  doSomething2(courseName: any):void {
        this.elem.nativeElement.querySelector('#videosModal .modal-header h2').innerHTML = courseName;
  }

  doSomething3(courseid: any):void {
      this.courseId = courseid;
  }

  doSomething4(segmentid: any):void {
    this.segmentId = segmentid;
  }
  
  startTimer() {
    this.myTimer = setInterval(() => {
      if(this.counter2 > 0) {
        this.counter2--;

        this.minutes = Math.floor((this.counter2 % 60)/60);
        this.seconds = Math.floor(this.counter2 % 60);
        
      } else {
        
        this.StopTimerModal();
        
        this.OkButtonTimeModal?.nativeElement.click();
        console.log("myTimerClear");
      }
    },this.interval2)

  }

  startSegmentTimer() {

    console.log("Insert_startSegmentTimer");
    this.mySegmentTimer = setInterval(() => {

      if(this.counter3 > 0) {

        this.counter3--;
        this.seconds1 = Math.floor(this.counter3 % 60);

      } else {
        
        for (let i = 0; i < this.totalQuestionNo; i++) {
          if(this.closeStatus){
            break;
          }
          console.log("For="+i);
          if(this.elem.nativeElement.querySelector('#assesmentqtypeOneModal'+i).classList.contains('show')){
            if(i == (this.totalQuestionNo - 1))
            {
              clearInterval(this.mySegmentTimer);
              this.elem.nativeElement.querySelector('#assesmentqtypeOneModalClose'+i).click();
              console.log("OK Close"+i);
            }
            else {
              console.log("AUTO="+i);
              this.elem.nativeElement.querySelector('#assesmentqtypeOneModalSubmit'+i).click();
              break;
                
            }
          }
        }

      }
    },this.interval3)

  }

  /*
  submitData(myForm:any){

    this.reqPayload4 = {
        function: "evaluateAnswer",
        segmentId: this.segmentId,
        courseId: this.courseId,
        questionNumber: this.questionNumber.get('questionNumber')?.value,
        answer: " a = 1  "
    };

    //this.payLoad = JSON.stringify(this.DataForm.value);
  }
  */
 
  /*
  generateFormControls(formData: any)
  {
      let tempGroup: FormGroup = new FormGroup({});
      formData.forEach((i: { name: string; })=>{
          tempGroup.addControl(i.name, new FormControl(''))
      })
      return tempGroup;
  }
  */
  
  onSubmit(myForm:any){
    console.log(myForm);
    //console.log(myForm.form.value.inputs);
  }
}




