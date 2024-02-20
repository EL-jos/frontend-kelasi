import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { faChalkboardTeacher, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ClasseBottomSheetComponent } from 'src/app/bottom-sheet/classe-bottom-sheet/classe-bottom-sheet.component';
import { TeacherBottomSheetComponent } from 'src/app/bottom-sheet/teacher-bottom-sheet/teacher-bottom-sheet.component';
import { TeacherCourseBottomSheetComponent } from 'src/app/bottom-sheet/teacher-course-bottom-sheet/teacher-course-bottom-sheet.component';
import { AtuhService } from 'src/app/services/auth/atuh.service';
import { SchoolSelectionService } from 'src/app/services/school-selection/school-selection.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit{

  faPlusCircle = faPlusCircle;
  
  displayedColumnsTeacher: string[] = ['no', 'name', 'gender', 'phone', 'age', 'action'];
  dataSourceTeacher = new MatTableDataSource<any>([]);

  subscription!: Subscription;
  teachers: any[] = [];

  user: any;
  school: any;

  constructor(
    private authService: AtuhService,
    private schoolService: SchoolSelectionService,
    private bottomSheetTeacher: MatBottomSheet,
    private teacherService: TeacherService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.authService.user.subscribe((user: any) => this.user = user);

    this.teacherService.teachers$.subscribe((teachers:any) => {
      this.teachers = teachers;
      this.dataSourceTeacher.data = this.teachers;
    });
    this.teacherService.emitTeachers();

    this.schoolService.schoolSelected.subscribe((school: any) => this.school = school);
  }

  onCreateTeacher(){
    this.bottomSheetTeacher.open(TeacherBottomSheetComponent, {
      data: {
        user: this.user,
        school: this.school
      }
    })
  }

  /* onCreate(){
    
    const bottomSheetRef = this.classeBottomsheet.open(ClasseBottomSheetComponent, {
      data: {
        levels: this.levels,
        sections: this.sections,
        options: this.options,
        school: this.school,
        user: this.user
      }
    });
    bottomSheetRef.afterDismissed().subscribe((res: any) => {
      if(res.status){
        this.snackBar.open(res.message, "Fermer");
      }
      
    });
  } */

  onUpdate(element: any){
    const bottomSheetRef = this.bottomSheetTeacher.open(TeacherBottomSheetComponent, {
      data: {
        teacher: element,
        school: this.school,
        user: this.user
      }
    });
    bottomSheetRef.afterDismissed().subscribe((res: any) => {
      if(res && res.status){
        this.snackBar.open(res.message, "Fermer");
      }
    });
  }

  onShow(element: any){
    this.bottomSheetTeacher.open(TeacherCourseBottomSheetComponent, {
      data: {
        teacher: element,
        user: this.user,
        school: this.school
      }
    });
  }

  onDelete(element: any){
    this.teacherService.delete({teacher: element, user: this.user, school: this.school}).subscribe((response: {code: number, message: string, data: any[]}) => {

      if(response.code === 0){

        this.teacherService.teachers = response.data;
        this.teacherService.emitTeachers();

      }

    });
  }
}
