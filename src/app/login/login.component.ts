import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/login/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error!: string;
  finalData = <any>{};
  
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) {
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'

  }

  // convenience getter for easy access to form fields
  get f():any { return this.loginForm.controls; }

  onSubmit() {
        
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.finalData = {
          function: "login",
          email: this.f.email.value,
          password: this.f.password.value
        }

        //this.loading = true;
        this.authenticationService.login(this.finalData)
            .pipe(first())
            .subscribe((res:any) => {
              console.log(res);
              console.log('User logged in successfully!');
              
           });
           
  }

}


