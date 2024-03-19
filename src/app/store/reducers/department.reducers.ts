// product.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { DepartmentActions, DepartmentActionTypes, loadDepartments, loadDepartmentsFailure, loadDepartmentsSuccess, resetState } from '../actions/department.actions';
import { Department } from '../../models/department';
// resetState

export interface DepartmentState {
    departments: Department[];
    loading: boolean;
    error: any;
}

export const initialState: DepartmentState = {
    departments: [],
    loading: false,
    error: null
};

export const DepartmentReducer = createReducer(
  initialState,
  on(loadDepartments, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadDepartmentsSuccess, (state, { departments }) => ({
    ...state,
    departments,
    loading: false,
    error: null
  })),
  on(loadDepartmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(resetState, () => {console.log('data is reset');return initialState})
);
