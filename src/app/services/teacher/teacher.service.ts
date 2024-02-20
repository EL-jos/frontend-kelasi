import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  teachers: any[] = [];
  teachers$ = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }

  emitTeachers(){
    this.teachers$.next(this.teachers.slice());
  }

  create(data: any){

    let formData = new FormData();
    formData.append('data', JSON.stringify(data));

    return this.http.post<{code: number, message: string, data: any[]}>(`${environment.serveur}/teacher`, formData, { headers: {'Authorization': 'Bearer ' + data.user.token, 'school': data.school.id} });
    
  }

  read(data: {user: any, school:any}){

    this.http.get<{code: number, message: string, data: any[]}>(`${environment.serveur}/teacher`, { headers: {'Authorization': 'Bearer ' + data.user.token, 'school': data.school.id}}).subscribe(
      (response: {code: number, message: string, data: any}) => {
      
        if(response.code === 0){

          this.teachers = response.data;
          this.emitTeachers();

        }

      }
      
    );
  }

  update(data: any){

    return this.http.put<{code: number, message: string, data: any[]}>(`${environment.serveur}/teacher/${data.teacher.id}`, data, { headers: {'Authorization': 'Bearer ' + data.user.token, 'school': data.school.id} });
    
  }

  delete(data: {teacher: any, user: any, school: any}){
    return this.http.delete<{code: number, message: string, data: any[]}>(`${environment.serveur}/teacher/${data.teacher.id}`, { headers: {'Authorization': 'Bearer ' + data.user.token, 'school': data.school.id}});
  }

  show(data: {teacher: any, user: any, school: any}){
    return this.http.get<{code: number, message: string, data: any}>(`${environment.serveur}/teacher/${data.teacher.id}`, { headers: {'Authorization': 'Bearer ' + data.user.token, 'school': data.school.id} });
  }
}
