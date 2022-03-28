import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
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
    AvailableClassesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
