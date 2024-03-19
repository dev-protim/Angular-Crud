import { createAction, props } from "@ngrx/store";
import { Department } from '../../models/department';


export enum DepartmentActionTypes {
    LOAD_DEPARTMENTS = '[Department] Load Departments',
    LOAD_DEPARTMENTS_SUCCESS = '[Department] Load Departments Success',
    LOAD_DEPARTMENTS_FAILURE = '[Department] Load Departments Failure',
    DEPARTMENT_RESET = '[Department] Reset State',
}

export const loadDepartments = createAction(
    DepartmentActionTypes.LOAD_DEPARTMENTS
);

export const loadDepartmentsSuccess = createAction(
    DepartmentActionTypes.LOAD_DEPARTMENTS_SUCCESS,
    props<{ departments: Department[] }>()
);

export const loadDepartmentsFailure = createAction(
    DepartmentActionTypes.LOAD_DEPARTMENTS_FAILURE,
    props<{ error: any }>()
);

export const resetState = createAction(
    DepartmentActionTypes.DEPARTMENT_RESET
  );

export type DepartmentActions = ReturnType<typeof loadDepartments | typeof loadDepartmentsSuccess | typeof loadDepartmentsFailure | typeof resetState>;