import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

export const DashboardRoute: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'department-details/:id',
        loadComponent: () => import('./slugs/department-details/department-details.component').then((m) => m.DepartmentDetailsComponent)
    }
]