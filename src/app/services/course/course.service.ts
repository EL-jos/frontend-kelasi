import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: any[] = [];
  courses$ = new Subject<any[]>();
  
  constructor(
    private http: HttpClient,
  ) { }

  emitCourses(){
    this.courses$.next(this.courses.slice());
  }

  create(data: {name: string, coefficient: number, teacher_id: string, user: any, classe: any}){

    let formData = new FormData();
    formData.append('data', JSON.stringify(data));

    return this.http.post<{code: number, message: string, data: any[]}>(`${environment.serveur}/course`, formData, { headers: {'Authorization': 'Bearer ' + data.user.token, 'classe': data.classe.id} });
    
  }

  read(data: {user: any, classe:any}){

    this.http.get<{code: number, message: string, data: any[]}>(`${environment.serveur}/course`, { headers: {'Authorization': 'Bearer ' + data.user.token, 'classe': data.classe.id}}).subscribe(
      (response: {code: number, message: string, data: any}) => {
      
        if(response.code === 0){

          this.courses = response.data;
          this.emitCourses();

        }

      }
      
    );
  }

  update(data: {name: string, coefficient: number, teacher_id: string, user: any, classe: any, course: any}){

    return this.http.put<{code: number, message: string, data: any[]}>(`${environment.serveur}/course/${data.course.id}`, data, { headers: {'Authorization': 'Bearer ' + data.user.token, 'classe': data.classe.id} });
    
  }

  delete(data: {course: any, user: any, classe: any}){

    return this.http.delete<{code: number, message: string, data: any[]}>(`${environment.serveur}/course/${data.course.id}`, { headers: {'Authorization': 'Bearer ' + data.user.token, 'classe': data.classe.id}});
    
  }
  
  getCoursesOfClasse(data: {user: any, classe: any}){

    return this.http.get<{code: number, message: string, data: any}>(`${environment.serveur}/read/courses/classe/${data.classe.id}`, { headers: {'Authorization': 'Bearer ' + data.user.token} });
  
  }
}
