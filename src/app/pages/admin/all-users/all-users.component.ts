import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginateModel } from 'src/app/models/app-models/paginate-model';
import { Subscription, throwError } from 'rxjs';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/store/auth-store/auth.actions';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/models/app-models/user';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit{

  user: User;
  errorMessage: string;
  isLoading = false;
  allUsers: PaginateModel;
  length: number;
  pageSize: number;
  pageIndex: number;
  pageSizeOptions = [10, 25, 50, 100];
  showFirstLastButtons = true;

  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.getAdminAllUsers().subscribe(
      response => this.subscribeResponse(response),
      errorMessage => this.subscribeError(errorMessage)
    );
  }

  handlePageEvent(event: PageEvent) {
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.isLoading = true;
    this.authService.paginateAdminAllUsers(this.allUsers.meta.links[this.pageIndex+1].url, this.pageSize)
      .subscribe(
        response => this.subscribeResponse(response),
        errorMessage => this.subscribeError(errorMessage)
      );
  }

  subscribeResponse(response){
    console.log(response);
    this.allUsers = response;
    this.store.dispatch(new AuthActions.AddAllUsers(response));
    this.length = this.allUsers.meta.total;
    this.pageSize = this.allUsers.meta.per_page;
    this.pageIndex = this.allUsers.meta.current_page-1;
    this.isLoading = false;
  }

  subscribeError(errorMessage){
    this.errorMessage = errorMessage;
    console.log(this.errorMessage);
    this.isLoading = false;
  }
}
