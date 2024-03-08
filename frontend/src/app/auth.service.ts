import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Class, variables copied from eloaded/app-admin
  public currentUserSubject = new BehaviorSubject<any | null>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  get isLoggedIn() {
    return this.currentUserSubject.value;
  }

  // Constructor didnt worked. I did some researched and changed a little.
  constructor(private router: Router) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUserSubject = new BehaviorSubject<any>(
        JSON.parse(currentUser)
      );
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  loginUser(email: any) {
    localStorage.setItem('currentUser', JSON.stringify(email));
    this.currentUserSubject.next(email);
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/poke/login'])
  }
}
