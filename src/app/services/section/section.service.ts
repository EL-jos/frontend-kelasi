import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  sections: any[] = [];
  sections$ = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }

  emitSections(){
    this.sections$.next(this.sections.slice());
  }

  create(){

  }

  read(){

    this.http.get<{code: number, message: string, data: any[]}>(`${environment.serveur}/section`).subscribe(
      (response: {code: number, message: string, data: any}) => {
      
        if(response.code === 0){

          this.sections = response.data;
          this.emitSections();

        }

      }
      
    );
  }

  update(){
    
  }

  delete(){
    
  }
}
