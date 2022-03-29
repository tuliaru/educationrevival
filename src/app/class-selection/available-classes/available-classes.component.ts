import { Router } from '@angular/router';
import { Component, Input, ViewChild, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { RegisterStudentForClassService } from '../../services/registerStudentForClass/register-student-for-class.service';


@Component({
  selector: 'app-available-classes',
  templateUrl: './available-classes.component.html',
  styleUrls: ['./available-classes.component.css']
})

export class AvailableClassesComponent implements OnInit, AfterViewInit {
  @Input() courseobj: any;
  coursename: string = "";
  courseid: number | undefined;
  reqPayload: any = {};
  reqPayloadRegisterStudentForClass = <any>{};
  isRegistered: boolean = false;
  isLoading: boolean = false;
  @ViewChild("register") register?: ElementRef;
  @ViewChild("divbtn") divbtn?: ElementRef;
  @ViewChild("divcourse") divcourse?: ElementRef;
  @ViewChild("divwrapper") divwrapper?: ElementRef;

  constructor(private renderer: Renderer2, private registerStudentForClass: RegisterStudentForClassService,private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    this.courseid = this.courseobj.courseId;
    this.coursename = this.courseobj.courseName;

    this.reqPayload = {
      function: "isStudentRegisteredForClass",
      studentId: user.userId,
      courseId: this.courseid

    };
    this.reqPayloadRegisterStudentForClass = {
			function: "registerStudentForClass",
			studentId: user.userId,
			courseId: this.courseid
		}
    this.registerStudentForClass.isStudentRegisteredForClass(this.reqPayload).subscribe((res:any) => {
        if(res.isRegistered)
        {
          const coursediv = this.renderer.createElement('h3');
          const namecourse = this.renderer.createText(this.coursename);
          this.renderer.appendChild(coursediv,namecourse);
          this.renderer.appendChild(this.divcourse?.nativeElement,coursediv);
          this.renderer.addClass(coursediv,'class-name');
          
          const elem = this.renderer.createElement("button");
          const text = this.renderer.createText("Registered");
          this.renderer.appendChild(elem,text);
          this.renderer.appendChild(this.divbtn?.nativeElement,elem);
          this.renderer.addClass(elem,"btn");
          this.renderer.addClass(elem,"btn-success");
          this.renderer.addClass(elem,"btn-sm");
          this.renderer.setStyle(elem,'cursor','none');
          this.isLoading = false;
        }
        else{
          const coursediv = this.renderer.createElement('h3');
          const namecourse = this.renderer.createText(this.coursename);
          this.renderer.appendChild(coursediv,namecourse);
          this.renderer.appendChild(this.divcourse?.nativeElement,coursediv);
          this.renderer.addClass(coursediv,'class-name');

          const elem = this.renderer.createElement("button");
          const text = this.renderer.createText("Register");
          this.renderer.appendChild(elem,text);
          this.renderer.appendChild(this.divbtn?.nativeElement,elem);
          this.renderer.addClass(elem,"btn");
          this.renderer.addClass(elem,"btn-dark");
          this.renderer.addClass(elem,"btn-sm");
          this.renderer.listen(elem,'click',event => {
            const loadingElem = this.renderer.createElement('div');
            const loadingText = this.renderer.createText('Please wait...while you are being redirect to progress page');
            this.renderer.appendChild(loadingElem,loadingText);
            this.renderer.addClass(loadingElem,'text-center');
            this.renderer.addClass(loadingElem,'pt-2');
            this.renderer.appendChild(this.divwrapper?.nativeElement,loadingElem);

            this.registerStudentForClass.create(this.reqPayloadRegisterStudentForClass).subscribe((res:any) => {
              console.log('Student successfully registered for class!');
              this.router.navigate(['/dashboard/student-progress']);
              
           });
            this.renderer.removeClass(elem,"btn-dark");
            this.renderer.addClass(elem,"btn-success");
            this.renderer.setStyle(elem,'cursor','none');
            this.renderer.setProperty(elem,'innerHTML','Registered');

          });
          this.isLoading = false;
        }
    })
  }
  ngAfterViewInit(): void {
    //console.log(this.register?.nativeElement.firstChild.textContent);
  }
  
}
