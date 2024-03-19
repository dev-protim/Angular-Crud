import { Component } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiCallService } from '../../shared/services/api-call/api-call.service';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { logOut } from '../../store/actions/auth.actions';
import { resetState } from '../../store/actions/department.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ListComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  subs = new SubSink();

  constructor(private apiService: ApiCallService,
    private router: Router,
    private store: Store<AppState>) {

  }

  logout(): void {
    this.store.dispatch(logOut());
    this.store.dispatch(resetState());
    // this.subs.sink = this.apiService.logout().subscribe((res: any) => {
    //   if (res.statusCode === 200) {
    //     this.router.navigate([''])
    //   }
    // })
  }

}
