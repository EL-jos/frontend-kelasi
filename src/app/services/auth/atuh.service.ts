import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AtuhService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getAccessToken());
  userSubject: BehaviorSubject<any | null> = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient, 
              private router: Router) { }

  get token(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  get user(): Observable<any | null> {
    return this.userSubject.asObservable();
  }

  logIn(credentials: {email: string, password: string}){
    let formData = new FormData();
    formData.append("credentials", JSON.stringify(credentials))
    return this.http.post(`${environment.serveur}/auth/login`, formData);
  }

  logout(id: any) {
    let formData = new FormData();
    formData.append("user_id", id)
    return this.http.post<any>(`${environment.serveur}/auth/logout`, formData, { headers: {'Authorization': 'Bearer ' + this.getAccessToken(),} });
  }

  getAccessToken(): string | null{
    if(this.accessTokenExist()){
      return localStorage.getItem("access_token")!;
    }
    return null;
  }

  setTokenInStorage(token: string | null): void {
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }

  accessTokenExist(): boolean{
    return localStorage.getItem("access_token") ? true : false;
  }
}
