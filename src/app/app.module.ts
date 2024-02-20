import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AtuhService } from './services/auth/atuh.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ChartModule } from 'primeng/chart';
import { ClasseComponent } from './pages/classe/classe.component';
import { MarksheetComponent } from './pages/marksheet/marksheet.component';
import { RegisterComponent } from './pages/register/register.component';
import { StudentComponent } from './pages/student/student.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from "@angular/material/icon";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CourseComponent } from './pages/course/course.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { IntercepteurService } from './services/intercepteur/intercepteur.service';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from 'ng2-ckeditor';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ClasseBottomSheetComponent } from './bottom-sheet/classe-bottom-sheet/classe-bottom-sheet.component';
import { ClasseService } from './services/classe/classe.service';
import { ClasseSingleComponent } from './pages/classe-single/classe-single.component';
import { ScheduleComponent } from './bottom-sheet/schedule/schedule.component';
import { StudentBottomSheetComponent } from './bottom-sheet/student-bottom-sheet/student-bottom-sheet.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
// Importez la locale fr pour le français
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TeacherBottomSheetComponent } from './bottom-sheet/teacher-bottom-sheet/teacher-bottom-sheet.component';
import { CourseBottomSheetComponent } from './bottom-sheet/course-bottom-sheet/course-bottom-sheet.component';
import { TeacherCourseBottomSheetComponent } from './bottom-sheet/teacher-course-bottom-sheet/teacher-course-bottom-sheet.component';
registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ClasseComponent,
    MarksheetComponent,
    RegisterComponent,
    StudentComponent,
    CourseComponent,
    TeacherComponent,
    ClasseBottomSheetComponent,
    ClasseSingleComponent,
    ScheduleComponent,
    StudentBottomSheetComponent,
    TeacherBottomSheetComponent,
    CourseBottomSheetComponent,
    TeacherCourseBottomSheetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatTabsModule,
    FullCalendarModule,
    ChartModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    FontAwesomeModule,
    //MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    AngularEditorModule,
    MatBottomSheetModule,
    CKEditorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule,
    IntercepteurService,
    AtuhService,
    ClasseService,
    {provide: HTTP_INTERCEPTORS, useClass: IntercepteurService, multi: true},
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: LOCALE_ID, useValue: 'fr' } // Définissez la locale pour les nombres et autres
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
