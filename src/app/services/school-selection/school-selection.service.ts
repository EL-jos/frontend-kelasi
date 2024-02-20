import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolSelectionService {

  schoolSelectedSubject: BehaviorSubject<any | null> = new BehaviorSubject<any>(null);

  get schoolSelected(): Observable<any | null> {
    return this.schoolSelectedSubject.asObservable();
  }

  constructor() {}

}
