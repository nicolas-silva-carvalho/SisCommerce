import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map, take } from 'rxjs';
import { environment } from '../environment/environment';
import { User } from '../models/identity/User';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  private currentUserSource = new ReplaySubject<User | null>(1);

  public currentUser$ = this.currentUserSource.asObservable();

  baseUrl = environment.apiURL + 'Usuario/'

  constructor(private http: HttpClient) { }

  public login(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'Login', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user)
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.currentUserSource.complete();
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  public registrar(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'RegisterUser', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user)
        }
      })
    );
  }
}
