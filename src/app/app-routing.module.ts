import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { StudentProgressComponent } from './student-progress/student-progress.component'
import { CompletedClassesComponent } from './completed-classes/completed-classes.component'
import { ClassSelectionComponent } from './class-selection/class-selection.component'

const routes: Routes = [
  {path : 'login', component: LoginComponent},
  {path : 'register', component: RegistrationComponent},
  {path: '',   redirectTo: '/login', pathMatch: 'full'},
  {path : 'dashboard', 
  component: DashboardComponent,
  children: [
    {path : 'student-progress', component: StudentProgressComponent},
    {path : 'completed-classes', component: CompletedClassesComponent},
    {path : 'class-selection', component: ClassSelectionComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forChild(routes)
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
