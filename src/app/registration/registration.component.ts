import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RegistrationService } from '../services/registration/registration.service';
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
  
   passwordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ["", [Validators.required]]
  }, { validator: this.checkPasswords });
  
  checkPasswords(group: FormGroup) {
        const pass = group.controls["password"].value;
        const confirmPass = group.controls["confirmPassword"].value;
        return pass === confirmPass ? null : { notSame: true };
    }
  
  display:string = 'none';
  
  @ViewChild('passwordGenModal') passwordGenModal?: ElementRef
  @ViewChild('openSucessModal') openSucessModal?: ElementRef

  isModalShow = false;
  isSuccessModalShow = true;
  formData = <any>{};
  passwordFormData =  <any>{};
  finalData = <any>{};
  formObj = <any>{};
  
  constructor(private fb: FormBuilder,public registrationService: RegistrationService) {
   
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
  
  get password(): any {
    return this.passwordForm.get('password');
  }
  
  get confirmPassword(): any {
    return this.passwordForm.get('confirmPassword');
  }
  
  ngAfterViewInit(): void {
      
  }
  
  ngOnDestroy() {
    this.passwordGenModal?.nativeElement.click();
  }

  onSubmit(){
        this.formData = this.registerForm.value;
    
  }
  newPasswordSubmit()
  {
		this.passwordFormData = this.passwordForm.value;
		this.formObj = {...this.formData,...this.passwordFormData};
		this.finalData = {
			function: "createNewStudentAccount",
			studentFirstLastName: this.formObj.firstName + " " + this.formObj.lastName,
			studentEmail: this.formObj.email,
			parentFirstLastName: this.formObj.parentFirstName + " " + this.formObj.parentLastName,
			parentEmail: this.formObj.parentEmail,
			parent2FirstLastName: this.formObj.secondParentFirstName + " " + this.formObj.secondParentLastName,
			parent2Email: this.formObj.secondParentEmail,
			password: this.formObj.password
		}
		this.passwordGenModal?.nativeElement.click();
		this.registerForm.reset();
		this.passwordForm.reset();
		this.openSucessModal?.nativeElement.click();
		console.log(this.formObj);
		
		this.registrationService.create(this.finalData).subscribe((res:any) => {
			 console.log('User created successfully!');
			 
		})
  }

  close(){
    this.isModalShow=true;
  }

}
