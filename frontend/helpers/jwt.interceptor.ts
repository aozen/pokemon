import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
// Copied from app-admin and changed a little 
export class JwtInterceptor implements HttpInterceptor {
  intercept
  (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem(`token`)
    if (token) {
      request = request
        .clone({ setHeaders: { Authorization: token } })
    }
    return next.handle(request)
  }
}
