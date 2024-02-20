import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CourseService } from 'src/app/services/course/course.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit{

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  courses: any[] = [];
  formGroupSchedule!: FormGroup;


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetSchedule: MatBottomSheetRef,
    private courseService: CourseService,
    private formScheduleBldr: FormBuilder,
    private scheduleService: ScheduleService
  ){}

  ngOnInit(): void {
    this.courseService.getCoursesOfClasse(this.data).subscribe((res: any) => {
      if(res.code === 0){
        this.courses = res.data;
      }
    });

    this.initFormSchedule();
  }

  initFormSchedule(){
    this.formGroupSchedule = this.formScheduleBldr.group({
      day: [this.data.schedule ? this.data.schedule.day : null],
      course_id: [this.data.schedule ? this.data.schedule.course.id : null],
      start_at: [this.data.schedule ? this.data.schedule.start_at : null],
      end_at: [this.data.schedule ? this.data.schedule.end_at : null]
    });
  }

  onSubmit(){

    this.formGroupSchedule.value.user = this.data.user;
    this.formGroupSchedule.value.classe = this.data.classe;

    if(this.data.schedule){

      this.formGroupSchedule.value.schedule = this.data.schedule;
      this.scheduleService.update(this.formGroupSchedule.value).subscribe((response: {code: number, message: string, data: any[]}) => {
        this.responseServer(response);
      });

    }else{

      this.scheduleService.create(this.formGroupSchedule.value).subscribe((response: {code: number, message: string, data: any[]}) => {
        this.responseServer(response);
      });

    }
    

  }

  onReset(){
    this.formGroupSchedule.reset();
    this.bottomSheetSchedule.dismiss();
  }

  onDelete(){
    this.scheduleService.delete({schedule: this.data.schedule, user: this.data.user, classe: this.data.classe}).subscribe((response: {code: number, message: string, data: any[]}) => {
      this.responseServer(response);
    });
  }

  responseServer(response: {code: number, message: string, data: any[]}){

    if(response.code === 0){
        
      this.scheduleService.schedules = response.data;
      this.scheduleService.emitSchedules();
      this.bottomSheetSchedule.dismiss({status: true, message: response.message});
    }

  }
}
