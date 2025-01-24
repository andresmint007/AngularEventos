// jwt.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceJwt } from '../services/ownServices/auth.servicejwt';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceJwt) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } 
  return next.handle(request);
  }
}
