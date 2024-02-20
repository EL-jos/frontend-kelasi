import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  levels: any[] = [];
  levels$ = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }

  emitLevels(){
    this.levels$.next(this.levels.slice());
  }

  create(){

  }

  read(){

    this.http.get<{code: number, message: string, data: any[]}>(`${environment.serveur}/level`).subscribe(
      (response: {code: number, message: string, data: any}) => {
      
        if(response.code === 0){

          this.levels = response.data;
          this.emitLevels();

        }

      }
      
    );
  }

  update(){
    
  }

  delete(){
    
  }
}
