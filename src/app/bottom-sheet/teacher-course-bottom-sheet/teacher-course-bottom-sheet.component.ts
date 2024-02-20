import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatTableDataSource } from '@angular/material/table';
import { AtuhService } from 'src/app/services/auth/atuh.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-course-bottom-sheet',
  templateUrl: './teacher-course-bottom-sheet.component.html',
  styleUrls: ['./teacher-course-bottom-sheet.component.scss']
})
export class TeacherCourseBottomSheetComponent implements OnInit {

  displayedColumnsCourse: string[] = ['no', 'name', 'coefficient', 'classe', 'schedule'];
  dataSourceCourse = new MatTableDataSource<any>([]);
  teacher: any;
  user: any;
  school: any;

  constructor(
    private teacherService: TeacherService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ){}

  ngOnInit(){

    this.teacher = this.data.teacher;
    this.user = this.data.user;
    this.school = this.data.school;

    this.teacherService.show({teacher: this.teacher, user: this.user, school: this.school}).subscribe((response: any) => {
      if(response.code === 0){
        this.dataSourceCourse.data = response.data;
      }
    });
  }

  formatTime(time: string): string {
    // Séparez l'heure, les minutes et les secondes
    const [hour, minute, second] = time.split(':');
    // Retourne seulement l'heure et les minutes
    return `${hour}:${minute}`;
}

}
