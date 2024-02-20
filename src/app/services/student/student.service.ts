import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: any[] = [];
  students$ = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }

  emitStudents(){
    this.students$.next(this.students.slice());
  }

  create(data: any){

    let formData = new FormData();
    formData.append('data', JSON.stringify(data));

    return this.http.post<{code: number, message: string, data: any[]}>(`${environment.serveur}/student`, formData, { headers: {'Authorization': 'Bearer ' + data.user.token, 'classe': data.classe.id} });
    
  }

  /* read(){

    this.http.get<{code: number, message: string, data: any[]}>(`${environment.serveur}/level`).subscribe(
      (response: {code: number, message: string, data: any}) => {
      
        if(response.code === 0){

          this.levels = response.data;
          this.emitLevels();

        }

      }
      
    );
  } */

  update(data: any){

    return this.http.put<{code: number, message: string, data: any[]}>(`${environment.serveur}/student/${data.student.id}`, data, { headers: {'Authorization': 'Bearer ' + data.user.token, 'classe': data.classe.id} });
    
  }

  delete(data: {student: any, user: any, classe: any}){
    return this.http.delete<{code: number, message: string, data: any[]}>(`${environment.serveur}/student/${data.student.id}`, { headers: {'Authorization': 'Bearer ' + data.user.token, 'classe': data.classe.id}});
  }

  show(data: {user: any, student: any,}){
    return this.http.get<{code: number, message: string, data: any}>(`${environment.serveur}/student/${data.student.id}`, { headers: {'Authorization': 'Bearer ' + data.user.token,} });
  }
}
