import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { User } from '../../models/app-models/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.L0GIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<HttpResponse<Object>>(
          environment.BASE_URL + 'api/auth/login',
          {
            email: authData.payload.email,
            password: authData.payload.password,
            rememberMe: authData.payload.rememberMe,
          },
          { observe: 'response' }
        )
        .pipe(
          map((response: HttpResponse<Object>) => {
            const user: User = this.createUser(response, authData.payload.rememberMe);
            return new AuthActions.Authenticate(user);
          }),
          catchError((errorRes) => {
            let errorMessage = 'An error occured. Please try again later.';
            if (errorRes && errorRes.error){
              errorMessage = errorRes.error.message;
            }
            return of(new AuthActions.AuthenticateFail(errorMessage));
          })
        );
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      let user: User =  JSON.parse(window.localStorage.getItem('user'));
      if (!user){
        return { type : 'DUMMY_TYPE'}
      }
      return new AuthActions.Authenticate(user);
    })
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      window.localStorage.removeItem('user');
    })
  );

  createUser(response: HttpResponse<Object>, remember_me): User {
    const user = new User();
    const headers: HttpHeaders = response.headers;
    user.authorization = headers.get(environment.TOKEN_KEY);
    user.email = headers.get(environment.USER_EMAIL_KEY);
    user.firstName = headers.get(environment.USER_FIRST_NAME_KEY);
    user.lastName = headers.get(environment.USER_LAST_NAME_KEY);
    user.role = headers.get(environment.USER_ROLE_KEY);
    user.tokenExpirationDate =
      new Date().getTime() +
      +headers.get(environment.TOKEN_EXPIRATION_TIME) * 60000;
    if (remember_me){
      window.localStorage.setItem('user', JSON.stringify(user));
    } else {
      window.sessionStorage.setItem('user', JSON.stringify(user));
    }
    return user;
  }
}
