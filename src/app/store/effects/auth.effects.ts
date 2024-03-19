import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { ApiCallService } from "../../shared/services/api-call/api-call.service";
import { AuthActionTypes, logIn, logInFailure, logInSuccess, logOut } from "../actions/auth.actions";
import { resetState } from "../actions/department.actions";

@Injectable()
export class AuthEffects {

    private api = inject(ApiCallService);
    action$ = inject(Actions);

    constructor(
        private router: Router
    ) {}

    // effects goes here
    logIn$ = createEffect(() => 
        this.action$.pipe(
            ofType(AuthActionTypes.LOGIN),
            switchMap((action) => {
                return this.api.login(action).pipe(
                    map((user: any) => {
                        return logInSuccess({ email: action.email });
                      }),
                      catchError((error) => {
                        return of(logInFailure(error));
                      })
                )
            })
        )
    )

    logInSuccess$ = createEffect(() => 
        this.action$.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((action) => {
            this.router.navigateByUrl('/dashboard');
        })
        ),
        { dispatch: false }
    );

    logInFailure$ = createEffect(() => 
        this.action$.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE),
        tap((action) => {
            console.log('Login failure occurred:', action);
        })
        ),
        { dispatch: false }
    );

    logOut$ = createEffect(() => 
        this.action$.pipe(
        ofType(AuthActionTypes.LOGOUT),
        switchMap((action) => {
            return this.api.logout().pipe(
                map((user: any) => {
                    this.router.navigateByUrl('');
                })
            )
        })
        ),
        { dispatch: false }
    );
}