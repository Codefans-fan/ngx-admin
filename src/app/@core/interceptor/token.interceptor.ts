/**
 * create by fky
 * create on 12/5/2018
 */
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {flatMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: NbAuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!(req.url.indexOf('appdispatch/newversion') !== -1 || req.url.indexOf('appdispatch/uploadapp') !== -1)) {
      // upload file, do not set content type
      req = (req as HttpRequest<any>).clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (req.url.indexOf('/assets/i18n') > 0) {
      return next.handle(req);
    }


    if (req.url.indexOf('/user/login') === -1 && req.url.indexOf('/user/register') === -1) {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/auth/login']);
        return throwError({'code': 102, 'message': 'authentication error'});
      }
      return this.auth.getToken().pipe(flatMap((value: NbAuthJWTToken) => {
        if (value != null && value.getValue() &&  value.isValid()) {
          req = (req as HttpRequest<any>).clone({
            setHeaders: {
              Authorization: value.getValue(),
            },
          });
        }

        return next.handle(req);
      }));
    }
    return next.handle(req);
  }


}
