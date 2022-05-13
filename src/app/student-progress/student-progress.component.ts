import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';


import { RegisterStudentForClassService } from '../services/registerStudentForClass/register-student-for-class.service';

@Component({
  selector: 'app-student-progress',
  templateUrl: './student-progress.component.html',
  styleUrls: ['./student-progress.component.css']
})
export class StudentProgressComponent implements OnInit {

  reqPayload1 = <any>{};
  reqPayload2 = <any>{};
  reqPayload3 = <any>{};
  reqPayload4 = <any>{};
  reqPayload5 = <any>{};
  reqPayload6 = <any>{};
  reqPayload7 = <any>{};
  
  VideoAddress: string = "";
  videoName: string = "";
  courseId!: number; 
  segmentId!: number;
  closeStatus!:boolean;
  courseStartOrResume:string | undefined;
  LastCompletedModule:number = 0;
  NumberOfGradedModules:number = 0;
  getProgressBarValue: string | undefined;
  getProgressBarStyleWidth: number | undefined;
  getProgressBarAreaValueNow: number | undefined;
  TotalScorePossible:number = 0;
  TotalScore:number = 0;
  Score:number = 0;
  MaxScore:number = 0;
  getScoreValue: string | undefined;
  
  //HashMapAnswerMap:any;
  HashMapAnswerMap:Object = {};
  //counterValue!: any;
  //counterValue2!: any;
  getVideoSourceTag: string | undefined;
  OkButtonTimeModalClearTimeout: any;
  totalQuestionNo!: number;
  
  listOfCurrentClasses: {courseId: number, courseName: string, numberOfGradedModules: number}[] = [];
  listOfQuestionsData: {questionNumber: number, typeOfQuestion: number, questionLabel: string, questionData: any}[] = [];

  DataForm: FormGroup = new FormGroup({});
  questionNumber:number = 1;
  ctrl = new FormControl("");
  //nameField1 = new FormControl("");
  //nameField2 = new FormArray([]);
  //nameField3 = new FormControl("");

  

  counter2 = 180000;
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
  @ViewChild("divScoreValue") divScoreValue?: ElementRef;
  @ViewChild("hiddenButtonForScoreModal") hiddenButtonForScoreModal?: ElementRef;
  
  
  constructor(private renderer: Renderer2, 
              private registerStudentForClassService:RegisterStudentForClassService, 
              private elem:ElementRef,
              private fb: FormBuilder
              ) {
                //this.questionNumber = this.fb.group({questionNumber: ''});
                //this.DataForm = this.generateFormControls(this.listOfQuestionsData);
              
                this.DataForm = this.fb.group({
                  nameField1: this.fb.array([]),
                  nameField2: this.fb.array([]),
                  nameField3: this.fb.array([])
                })
                

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
    this.counter2 = 180000;
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

        /******FOR 1 MINUTE *****/
        //this.minutes = Math.floor((this.counter2 % 60)/60);
        //this.seconds = Math.floor(this.counter2 % 60);

        /******FOR 3 MINUTES ********/
        this.minutes = Math.floor((this.counter2  % (60*3))/60);
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
  
  
  onSubmit(qType:number){

      console.log(this.DataForm);

      let ans:any;
      /*
      if(qType==1){
        ans = this.DataForm.get('nameField1')?.value;  
      }else if(qType==2){
        ans = this.DataForm.get('nameField2')?.value;
        ans = ans.join(';');
      }else{
        ans = this.DataForm.get('nameField3')?.value;
      }
      */

      if(qType==2){
        ans = this.DataForm.get('nameField2')?.value;
        ans = ans.join(';');
      }else{
        ans = this.DataForm.get('nameField3')?.value;
        ans = ans.join('');
      }
      
    
      this.reqPayload4 = {
          function: "evaluateAnswer",
          segmentId: this.segmentId,
          courseId: this.courseId,
          questionNumber: this.questionNumber,
          answer: ans
      };
        
      console.log(this.reqPayload4);

      let ref:any = this;
      this.registerStudentForClassService.evaluateAnswer(ref.reqPayload4).subscribe((res:any) => {

        console.log(res);

        ref.HashMapAnswerMap[ref.questionNumber] = res.result;
        
        ref.DataForm = ref.fb.group({
          nameField2: ref.fb.array([]),
          nameField3: ref.fb.array([])
        })

        ref.questionNumber++;

        if(ref.totalQuestionNo == (ref.questionNumber - 1)){

            console.log("recordAssessment");
            console.log(ref.HashMapAnswerMap);
            const user = JSON.parse(localStorage.getItem('currentUser')!);

            ref.reqPayload5 = {
                function: "recordAssessment",
                answerMap: ref.HashMapAnswerMap,
                studentId: user.userId,
                segmentId: ref.segmentId,
                courseId: ref.courseId
            };

            ref.registerStudentForClassService.recordAssessment(ref.reqPayload5).subscribe((res:any) => {
              console.log(res);
              ref.Score = res.score;
              ref.MaxScore = res.maxScore;
              const scoreModalText = 'You passed with '+ref.Score+' out of '+ref.MaxScore;
              this.elem.nativeElement.querySelector('#scoreModal .modal-body .video-box .ratio.ratio-16x9').innerHTML = scoreModalText;
              this.hiddenButtonForScoreModal?.nativeElement.click();

              /**************************** START SCORE AND PROGRESS BAR UPDATE*******/
              /*
              this.reqPayload6 = {
                function: "getCompletedAndTotalModules",
                studentId: user.userId,
                courseId: ref.courseId
              };
          
              this.registerStudentForClassService.getCompletedAndTotalModules(this.reqPayload6).subscribe((res:any) => {
                
                this.LastCompletedModule = res.lastCompletedModule;
                if(this.LastCompletedModule==0){
                  this.courseStartOrResume = 'Start';
                }else{
                  this.courseStartOrResume = 'Resume';
                }
                this.NumberOfGradedModules = res.numberOfGradedModules;
                this.getProgressBarValue = this.LastCompletedModule+'/'+this.NumberOfGradedModules;
                this.getProgressBarStyleWidth = Math.round((this.LastCompletedModule/this.NumberOfGradedModules)*100);
                this.getProgressBarAreaValueNow = this.getProgressBarStyleWidth;
                
              });
              
              this.reqPayload7 = {
                function: "getActualAndTotalPossibleScores",
                studentId: user.userId,
                courseId: ref.courseId
              };

              this.registerStudentForClassService.getActualAndTotalPossibleScores(this.reqPayload7).subscribe((res:any) => {
                this.TotalScore = res.totalScore;
                this.TotalScorePossible = res.totalScorePossible;
                this.getScoreValue = this.TotalScorePossible+'/'+this.TotalScore;
                const getActualAndTotalPossibleScoresValueHTML = '<div class="score-label">Score ( '+this.getScoreValue+' )</div>'
                this.renderer.setProperty(this.divScoreValue?.nativeElement,'innerHTML', getActualAndTotalPossibleScoresValueHTML);
              });

              */
                  ref.listOfCurrentClasses = [];

                  ref.reqPayload1 = {
                          function: "getListOfCurrentClasses",
                          studentId: user.userId
                        };
                        ref.registerStudentForClassService.getListOfCurrentClasses(ref.reqPayload1).subscribe((res:any) => {
                        res.forEach((item:any) => {
                          ref.listOfCurrentClasses.push(item);
                            });
                        });

                 /**************************** END SCORE AND PROGRESS BAR UPDATE*******/
             
            });
            
        }
        
        
        
      });
      

        

  }

  /*
  get questionNumber(): any {
    return this.DataForm.get('questionNumber');
  }
  */

  onCheckChange(event:any) {
    const formArray: FormArray = this.DataForm.get('nameField2') as FormArray || [];
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      console.log(event.target.value);
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
      console.log("formArray.controls=",formArray.controls);
      
      formArray.controls.forEach((ctrl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
      
    }
  }

  onBlur(event:any) {
    const formArray: FormArray = this.DataForm.get('nameField3') as FormArray || [];
    // Add a new control in the arrayForm
      console.log(event.target.value);
      formArray.push(new FormControl(event.target.value));
  }


}




