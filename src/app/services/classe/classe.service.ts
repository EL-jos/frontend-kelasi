import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SchoolSelectionService } from '../school-selection/school-selection.service';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  classes: any[] = [];
  classes$ = new Subject<any[]>();

  constructor(
    private http: HttpClient,
    private schoolService: SchoolSelectionService
  ) { }

  emitClasses(){
    this.classes$.next(this.classes.slice());
  }

  create(data: {level_id: number, section_id: number, option_id: number, user: any, school: any}){

    let formData = new FormData();
    formData.append('data', JSON.stringify(data));

    return this.http.post<{code: number, message: string, data: any[]}>(`${environment.serveur}/classe`, formData, { headers: {'Authorization': 'Bearer ' + data.user.token,} });
    
  }

  read(user: any, school:any){

    this.http.get<{code: number, message: string, data: any[]}>(`${environment.serveur}/classe`, { headers: {'Authorization': 'Bearer ' + user.token, 'school': school.id}}).subscribe(
      (response: {code: number, message: string, data: any}) => {
      
        if(response.code === 0){

          this.classes = response.data;
          this.emitClasses();

        }

      }
      
    );
  }

  update(data: {level_id: number, section_id: number, option_id: number, user: any, school: any, classe: any}){

    let formData = new FormData();
    formData.append('data', JSON.stringify(data));

    return this.http.put<{code: number, message: string, data: any[]}>(`${environment.serveur}/classe/${data.classe.id}`, data, { headers: {'Authorization': 'Bearer ' + data.user.token,} });
    
  }

  delete(data: {classe: any, user: any, school: any}){

    return this.http.delete<{code: number, message: string, data: any[]}>(`${environment.serveur}/classe/${data.classe.id}`, { headers: {'Authorization': 'Bearer ' + data.user.token, 'school': data.school.id}});
    
  }

  show(data: {user: any, school:any, classe: any}){
    return this.http.get<{code: number, message: string, data: any}>(`${environment.serveur}/classe/${data.classe.id}`, { headers: {'Authorization': 'Bearer ' + data.user.token} });
  }
}
