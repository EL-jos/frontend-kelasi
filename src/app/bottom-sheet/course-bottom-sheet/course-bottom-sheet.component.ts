import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-course-bottom-sheet',
  templateUrl: './course-bottom-sheet.component.html',
  styleUrls: ['./course-bottom-sheet.component.scss']
})
export class CourseBottomSheetComponent implements OnInit{

  formGroupCourse!: FormGroup;
  school: any;
  user: any;
  classe: any;
  teachers: any[] = [];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any,
    private fomGroupCourseBldr: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef,
    private courseService: CourseService
  ){}

  ngOnInit(): void {
    
    this.school = this.data.school;
    this.user = this.data.user;
    this.classe = this.data.classe;
    this.teachers = this.data.teachers;
    

    this.initFormGroupCourse();
  }

  initFormGroupCourse(){
    this.formGroupCourse = this.fomGroupCourseBldr.group({
      name: [this.data.course ? this.data.course.name : null],
      coefficient: [this.data.course ? this.data.course.coefficient : null],
      teacher_id: [this.data.course ? this.data.course.teacher_id : null],
      //classe_id: [this.data.course ? this.data.course.classe_id : null]
    });
  }

  onSubmit(){

    this.formGroupCourse.value.user = this.user;
    this.formGroupCourse.value.classe = this.data.classe;

    if(this.data.course){

      this.formGroupCourse.value.course = this.data.course;

      this.courseService.update(this.formGroupCourse.value).subscribe((response: {code: number, message: string, data: any[]}) => {

        this.responseServer(response);

      });

    }else{
      this.courseService.create(this.formGroupCourse.value).subscribe((response: {code: number, message: string, data: any[]}) => {

        this.responseServer(response);

      });
    }
    
  }

  responseServer(response: {code: number, message: string, data: any[]}){

    if(response.code === 0){
        
      this.courseService.courses = response.data;
      this.courseService.emitCourses();
      this.bottomSheetRef.dismiss({status: true, message: response.message});
    }

  }

  onReset(){
    this.formGroupCourse.reset();
    this.bottomSheetRef.dismiss({});
  }
}
