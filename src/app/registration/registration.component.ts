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

  isModalShow = false;
  formData = <any>{};
  passwordFormData =  <any>{};
  finalData = <any>{};
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
    //this.btnopen?.nativeElement.click()
    this.formData = this.registerForm.value;
    //formData.password = "test123466788"
    console.log(this.formData);
    // Api Request Here
  }
  newPasswordSubmit()
  {
		this.passwordFormData = this.passwordForm.value;
		this.finalData = {...this.formData,...this.passwordFormData};
		console.log(this.finalData);
  }

  close(){
    this.isModalShow=true;
  }

}
