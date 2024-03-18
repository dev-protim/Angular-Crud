import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./routes/login/login.component').then((routes) => routes.LoginComponent)
    },
    {
        path: 'dashboard',
        loadChildren: () => 
            import('./routes/dashboard/dashboard.routes').then((routes) => routes.DashboardRoute)
    }
];
