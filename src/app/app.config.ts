import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthReducer } from './store/reducers/auth.reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { DepartmentReducer } from './store/reducers/department.reducers';
import { DepartmentEffects } from './store/effects/department.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideState({ name: 'auth', reducer: AuthReducer }),
    provideState({ name: 'departments', reducer: DepartmentReducer }),
    provideEffects(AuthEffects, DepartmentEffects)],
};
