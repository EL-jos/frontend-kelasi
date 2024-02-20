import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { GenderService } from 'src/app/services/gender/gender.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-bottom-sheet',
  templateUrl: './teacher-bottom-sheet.component.html',
  styleUrls: ['./teacher-bottom-sheet.component.scss']
})
export class TeacherBottomSheetComponent implements OnInit {
  blood_groups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  genders: any[] = [];
  formGroupTeacher!: FormGroup;


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private genderService: GenderService,
    private formTeacherBldr: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef,
    private teacherService: TeacherService
  ){}
  
  ngOnInit(): void {
    this.genderService.genders$.subscribe((genders: any[]) => this.genders = genders);
    this.genderService.emitGenders();

    this.initFormTeacher();
  }

  initFormTeacher(){
    this.formGroupTeacher = this.formTeacherBldr.group({
      nom: [this.data.teacher ? this.data.teacher.user.nom : null],
      postnom: [this.data.teacher ? this.data.teacher.user.postnom : null],
      prenom: [this.data.teacher ? this.data.teacher.user.prenom : null],
      email: [this.data.teacher ? this.data.teacher.user.email : null],
      blood_group: [this.data.teacher ? this.data.teacher.user.blood_group : null],
      gender_id: [this.data.teacher ? this.data.teacher.user.gender_id : null],
      phone: [this.data.teacher ? this.data.teacher.user.phone : null],
      birth: [this.data.teacher ? this.data.teacher.user.birth : null],
      medical_history: [this.data.teacher ? this.data.teacher.user.medical_history : null],
      address: [this.data.teacher ? this.data.teacher.user.address : null],
      password: [''],
      classe_id: [this.data.teacher ? this.data.teacher.classe_id : null]
    });

    if(this.data.teacher){
      this.formGroupTeacher.get('password')?.disable({onlySelf: true});
    }
    
  }

  onSubmit(){
    this.formGroupTeacher.value.user = this.data.user;
    this.formGroupTeacher.value.school = this.data.school;

    if(this.data.teacher){

      this.formGroupTeacher.value.teacher = this.data.teacher;
      this.teacherService.update(this.formGroupTeacher.value).subscribe((response: {code: number, message: string, data: any[]}) => {

        this.responseServer(response);

      });

    }else{
      this.teacherService.create(this.formGroupTeacher.value).subscribe((response: {code: number, message: string, data: any[]}) => {

        this.responseServer(response);

      });
    }

    
  }

  responseServer(response: {code: number, message: string, data: any[]}){

    if(response.code === 0){
        
      this.teacherService.teachers = response.data;
      this.teacherService.emitTeachers();
      this.bottomSheetRef.dismiss({status: true, message: response.message});
    }

  }
  
  onReset(){
    this.formGroupTeacher.reset();
    this.bottomSheetRef.dismiss({})
  }
}
