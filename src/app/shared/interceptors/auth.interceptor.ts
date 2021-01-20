import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/store/auth-store/auth.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService,  private router: Router, private store:Store<fromApp.AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap((user) => {
        if (req.url.startsWith('http://127.0.0.1:8000/api/user') || req.url.startsWith('http://127.0.0.1:8000/api/admin')) {
          if (new Date().getTime() > user.tokenExpirationDate) {
            window.localStorage.removeItem('user');
            window.sessionStorage.removeItem('user');
            this.store.dispatch(new AuthActions.Logout());
            this.router.navigate(['/login']);
          }
          const authReq = req.clone({
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': user.authorization
            })
          });
          return next.handle(authReq);
          // Intercepterlar request gitmeden once son islemin yapildigi servis.
          // Burada token gerektiren islemler icin kullanilacak endpointi yaz (If icine)
          // Servisten gonderilecek uygun url li requestler otomatik olarak TOKEN eklenmis olacak.
          // Birden fazla intercept te yapilabilir.
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
