// product.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DepartmentState } from '../reducers/department.reducers';
import { Department } from '../../models/department'

export const selectDepartmentState = createFeatureSelector<DepartmentState>('departments');

export const selectDepartments = createSelector(
  selectDepartmentState,
  state => state.departments.map( (department: any) => ({
    id: department.DepartmentId,
    name: department.DepartmentName,
    member: department.DepartmentMembers,
    details: department.DepartmentDetails
  }))
);

export const selectDepartmentLoading = createSelector(
  selectDepartmentState,
  state => state.loading
);

export const selectDepartmentError = createSelector(
  selectDepartmentState,
  state => state.error
);
