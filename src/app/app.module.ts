import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { FormappComponent } from './formapp/formapp.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentProgressComponent } from './student-progress/student-progress.component';
import { CompletedClassesComponent } from './completed-classes/completed-classes.component';
import { ClassSelectionComponent } from './class-selection/class-selection.component';

import { AuthGuard } from './services/login/auth.guard';
import { AuthService } from './services/login/auth.service';
import { AvailableClassesComponent } from './class-selection/available-classes/available-classes.component';
import { StudentProgressClassComponent } from './student-progress/student-progress-class/student-progress-class.component';
import { ProgressBarComponent } from './student-progress/student-progress-class/progress-bar/progress-bar.component';

/*SPINNER*/
import { NgxSpinnerModule } from "ngx-spinner";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {environment} from 'src/environments/environment';
import { CounterDirective } from './student-progress/counter.directive';
import { Counter2Directive } from './student-progress/counter2.directive';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RegistrationComponent,
    FormappComponent,
    LoginComponent,
    DashboardComponent,
    StudentProgressComponent,
    CompletedClassesComponent,
    ClassSelectionComponent,
    AvailableClassesComponent,
    StudentProgressClassComponent,
    ProgressBarComponent,
    CounterDirective,
    Counter2Directive
  ],
  imports: [
    BrowserModule,
    environment.production ? BrowserAnimationsModule : NoopAnimationsModule,
    AppRoutingModule,
	HttpClientModule,
	ReactiveFormsModule,
  NgxSpinnerModule,
  FormsModule
  
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
