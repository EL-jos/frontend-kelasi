import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  genders: any[] = [];
  genders$ = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }

  emitGenders(){
    this.genders$.next(this.genders.slice());
  }

  create(){

  }

  read(){

    this.http.get<{code: number, message: string, data: any[]}>(`${environment.serveur}/gender`).subscribe(
      (response: {code: number, message: string, data: any}) => {
      
        if(response.code === 0){

          this.genders = response.data;
          this.emitGenders();

        }

      }
      
    );
  }

  update(){
    
  }

  delete(){
    
  }
}
