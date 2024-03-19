import * as auth from './reducers/auth.reducers';
import * as department from './reducers/department.reducers';

export interface AppState {
    authState: auth.State,
    departments: department.DepartmentState
}

export const reducers = {
    auth: auth.AuthReducer,
    departments: department.DepartmentReducer
};