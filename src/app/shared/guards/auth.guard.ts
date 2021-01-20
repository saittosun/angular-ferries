import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/store/auth-store/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.store.select('auth').pipe(
        take(1),
        map(authState => {
        if(state.url === '/user-booking'){
          return !!authState.bookingParams ? true : this.router.createUrlTree(['home']);
        } else if (state.url.startsWith('/user/')){
          return !!authState.user.authorization ? true : this.router.createUrlTree(['login']);
        } else if (state.url.startsWith('/admin/')){
          return !!authState.user.authorization && authState.user.role === 'Admin' ? true : this.router.createUrlTree(['login']);
        }
        return true;
      }));
  }
}
