// product.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { loadDepartments, loadDepartmentsSuccess, loadDepartmentsFailure, DepartmentActionTypes } from '../actions/department.actions'
import { ApiCallService } from '../../shared/services/api-call/api-call.service';
import { Store, select } from '@ngrx/store';
import { selectDepartments } from '../selectors/department.selectors';

@Injectable()
export class DepartmentEffects {

    private api = inject(ApiCallService);
    action$ = inject(Actions);
    private store = inject(Store);

    constructor() {
    }
    
    loadDepartments$ = createEffect(() => this.action$.pipe(
        ofType(DepartmentActionTypes.LOAD_DEPARTMENTS),
        withLatestFrom(this.store.pipe(select(selectDepartments))),
        switchMap(([action, departmentList]) => {
            if (departmentList.length === 0) { // Fetch data only if not available in the store
              return this.api.getDepartments().pipe(
                map((departments: any) => loadDepartmentsSuccess({ departments })),
                catchError(error => of(loadDepartmentsFailure(error)))
              );
            } else {
              return of({ type: 'NO_ACTION' });
            }
        })
        )
    );
}
