/**
 * create by fky
 * create on 6/4/2019
 */
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {NbAuthService, NbAuthToken} from '@nebular/auth';
import {flatMap, tap} from 'rxjs/operators';
import {TokenPayloadModel} from './@core/models/token_payload.model';
import { of} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {

    const expectedRole = route.data.role;

    // 檢查權限
    return this.authService.isAuthenticated().pipe(
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['auth/login']);
          return of(false);
        }


        return this.authService.getToken().pipe( flatMap((token: NbAuthToken) => {
          // if not set expected role, return true
          if (!expectedRole) {
            return of(true);
          }

          if (!token.isValid()) {
            this.router.navigate(['auth/login']);
            return of(false);
          }


          const payload =  token.getPayload() as TokenPayloadModel;
          let isAdmin: boolean = false;
          for ( const role of payload.roles){
            if ( role === expectedRole) {
              isAdmin = true;
              break;
            }
          }

          return of(isAdmin);

        }));

      }),
    );


  }
}
