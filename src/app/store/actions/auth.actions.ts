import { createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login FAILURE',
  LOGOUT = '[Auth] Logout'
}

export const logIn = createAction(
  AuthActionTypes.LOGIN,
  props<{ payload: any }>()
);

export const logInSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ email: string }>()
);

export const logInFailure = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ payload: any }>()
);

export const logOut = createAction(
  AuthActionTypes.LOGOUT
);


export type AuthActions = ReturnType<typeof logIn | typeof logInSuccess | typeof logInFailure | typeof logOut>;