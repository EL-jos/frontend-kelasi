import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  options: any[] = [];
  options$ = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }

  emitOptions(){
    this.options$.next(this.options.slice());
  }

  create(){

  }

  read(){

    this.http.get<{code: number, message: string, data: any[]}>(`${environment.serveur}/option`).subscribe(
      (response: {code: number, message: string, data: any}) => {
      
        if(response.code === 0){

          this.options = response.data;
          this.emitOptions();

        }

      }
      
    );
  }

  update(){
    
  }

  delete(){
    
  }
}
