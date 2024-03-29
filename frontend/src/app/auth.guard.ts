import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (
    private router: Router,
    private _auth: AuthService
    ) { }

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this._auth.isLoggedIn
    if (currentUser) {
      // logged in so return true
      return true
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/poke/login'])
    return false
  }
}
