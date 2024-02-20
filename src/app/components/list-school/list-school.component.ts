import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-list-school',
  templateUrl: './list-school.component.html',
  styleUrls: ['./list-school.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule
  ],
  providers: [
    LocalStorageService,
  ]
})
export class ListSchoolComponent  implements OnInit {

  user: any = {
    schools: [
      {
        name: ''
      }
    ]
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private storageService: LocalStorageService,
    private router: Router,
    private dialogRef: MatDialogRef<ListSchoolComponent>,
    private classeService: ClasseService,
    private teacherService: TeacherService,
  ) { }

  ngOnInit() {
    this.user = this.dialogData;
    //this.user.schools = this.dialogData.userable.schools;
  }

  onClick(school: any){

    environment.settings.user = {
      id: this.user,
      is_admin: true,
      school_id: school.id,
    }

    this.storageService.setData(environment.settings);

    this.dialogRef.close(school);
    
    this.classeService.read(this.user, school)
    this.teacherService.read({user: this.user, school: school});

    this.router.navigate(["/dashboard"]);
    
  }

}
