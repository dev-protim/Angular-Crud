import { User } from "../../models/user";
import { AuthActionTypes, AuthActions } from "../actions/auth.actions";

export interface State {
    isAuthenticated: boolean,
    user: User | null,
    errorMessage: string | null
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
}

export function AuthReducer(state = initialState, action: AuthActions): State {
    switch (action.type) {
      case AuthActionTypes.LOGIN_SUCCESS: {
        return {
          ...state,
          isAuthenticated: true,
          user: {
            email: action.email
          },
          errorMessage: null
        };
      }
      case AuthActionTypes.LOGIN_FAILURE: {
        return {
          ...state,
          errorMessage: 'Incorrect email and/or password.'
        };
      }
      case AuthActionTypes.LOGOUT: {
        return initialState;
      }
      default: {
        return state;
      }
    }
}