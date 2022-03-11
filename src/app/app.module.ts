import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { FormappComponent } from './formapp/formapp.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentProgressComponent } from './student-progress/student-progress.component';
import { CompletedClassesComponent } from './completed-classes/completed-classes.component';
import { ClassSelectionComponent } from './class-selection/class-selection.component';


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
    ClassSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
