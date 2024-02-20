import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SchoolSelectionService } from '../school-selection/school-selection.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  schedules: any[] = [];
  schedules$ = new Subject<any[]>();

  constructor(
    private http: HttpClient,
  ) { }

  emitSchedules(){
    this.schedules$.next(this.schedules.slice());
  }

  create(data: {day: string, course_id: string, start_at: string, end_at: string, classe: any, user: any}){

    let formData = new FormData();
    formData.append('data', JSON.stringify(data));

    return this.http.post<{code: number, message: string, data: any[]}>(`${environment.serveur}/schedule`, formData, { headers: {'Authorization': 'Bearer ' + data.user.token,'classe': data.classe.id} });
    
  }

  read(data: {user: any, classe:any}){

    this.http.get<{code: number, message: string, data: any[]}>(`${environment.serveur}/schedule`, { headers: {'Authorization': 'Bearer ' + data.user.token, 'classe': data.classe.id}}).subscribe(
      (response: {code: number, message: string, data: any}) => {
      
        if(response.code === 0){

          this.schedules = response.data;
          this.emitSchedules();

        }

      }
      
    );
  }

  update(data: {day: string, course_id: string, start_at: string, end_at: string, classe: any, user: any, schedule: any}){

    return this.http.put<{code: number, message: string, data: any[]}>(`${environment.serveur}/schedule/${data.schedule.id}`, data, { headers: {'Authorization': 'Bearer ' + data.user.token,'classe': data.classe.id} });
    
  }

  delete(data: {classe: any, user: any, schedule: any}){

    return this.http.delete<{code: number, message: string, data: any[]}>(`${environment.serveur}/schedule/${data.schedule.id}`, { headers: {'Authorization': 'Bearer ' + data.user.token, 'classe': data.classe.id}});
    
  }

}
