import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit,AfterViewInit, OnDestroy {

  registerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    parentFirstName: ['', [Validators.required]],
    parentLastName: ['', [Validators.required]],
    parentEmail: ['', [Validators.required,Validators.email]],
    secondParentFirstName: [""],
    secondParentLastName: [""],
    secondParentEmail: ['', [Validators.required, Validators.email]],
  });
  display:string = 'none';
  
  @ViewChild('passwordGenModal') passwordGenModal?: ElementRef

  isModalShow = false;
  constructor(private fb: FormBuilder) {
   
  }
  
  ngOnInit(){
    
  }

  get firstName(): any {
    
    return this.registerForm.get('firstName');
  }

  get lastName(): any {
    return this.registerForm.get('lastName');
  }

  get email(): any {
    return this.registerForm.get('email');
  }

  get parentFirstName(): any {
    return this.registerForm.get('parentFirstName');
  }
  
  get parentLastName(): any {
    return this.registerForm.get('parentLastName');
  }

  get parentEmail(): any {
    return this.registerForm.get('parentEmail');
  }

  get secondParentFirstName(): any {
    return this.registerForm.get('secondParentFirstName');
  }
  
  get secondParentLastName(): any {
    return this.registerForm.get('secondParentLastName');
  }

  get secondParentEmail(): any {
    return this.registerForm.get('secondParentEmail');
  }
  
  
  ngAfterViewInit(): void {
      
  }
  
  ngOnDestroy() {
    this.passwordGenModal?.nativeElement.click();
  }

  onSubmit(){
    //this.btnopen?.nativeElement.click()
    const formData = this.registerForm.value;
    //formData.password = "test123466788"
    console.log(formData);
    // Api Request Here
  }

  close(){
    this.isModalShow=true;
  }

}
