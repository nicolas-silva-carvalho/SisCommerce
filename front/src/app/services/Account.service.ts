import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/identity/User';
import { Observable, map, BehaviorSubject, take, ReplaySubject } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSource = new BehaviorSubject<User | null>(null);

  public currentUser$ = this.currentUserSource.asObservable();

  baseUrl = environment.apiURL + 'Usuario';

  constructor(private router: Router, private http: HttpClient) {}

  public get userValue() {
    return this.currentUserSource.value;
  }

  public login(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + '/Login', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.currentUserSource.complete();
  }

  public registrar(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + '/RegisterUser', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  getAll() {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  getById(id: string) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${this.baseUrl}/${id}`, params).pipe(
      map((x) => {
        if (id == this.userValue?.id) {
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return x;
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      map((x) => {
        if (id == this.userValue?.id) {
          this.logout();
        }
        return x;
      })
    );
  }

  IsLogged() {
    let user = localStorage.getItem('user');
    return user !== null ? true : false;
  }
}
