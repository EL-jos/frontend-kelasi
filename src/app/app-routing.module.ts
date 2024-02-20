import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClasseComponent } from './pages/classe/classe.component';
import { MarksheetComponent } from './pages/marksheet/marksheet.component';
import { RegisterComponent } from './pages/register/register.component';
import { StudentComponent } from './pages/student/student.component';
import { CourseComponent } from './pages/course/course.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { ClasseSingleComponent } from './pages/classe-single/classe-single.component';

const routes: Routes = [

  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    data: { roles: ['Administrator'] }  // Rôles requis pour cette page
  },
  {
    path: 'classe',
    canActivate: [AuthGuard],
    component: ClasseComponent,
    data: { roles: ['Administrator'] },  // Rôles requis pour cette page
  },
  {
    path: 'classe/:id',
    canActivate: [AuthGuard],
    component: ClasseSingleComponent,
    data: { roles: ['Administrator'] },  // Rôles requis pour cette page
  },
  {
    path: 'course',
    component: CourseComponent,
  },
  {
    path: 'teacher',
    canActivate: [AuthGuard],
    component: TeacherComponent,
    data: { roles: ['Administrator'] }  // Rôles requis pour cette page
  },
  {
    path: 'student/:id',
    canActivate: [AuthGuard],
    component: StudentComponent,
    data: { roles: ['Administrator'] }  // Rôles requis pour cette page
  },
  {
    path: 'marksheet',
    canActivate: [AuthGuard],
    component: MarksheetComponent,
    data: { roles: ['Administrator'] }  // Rôles requis pour cette page
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
