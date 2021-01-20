import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/store/auth-store/auth.actions';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/app-models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  user: User;
  navbarCollapsed: Boolean = true;
  logoUrl: string = environment.BASE_URL + 'images/greece_ferries_white_logo.png';

  constructor(private store: Store<fromApp.AppState>) {}

  onToggleNavbarCollapsed(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  ngOnInit() {
    this.userSub = this.store.select('auth').subscribe((authState) => {
      this.user = authState.user;
    });
  }

  logout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
