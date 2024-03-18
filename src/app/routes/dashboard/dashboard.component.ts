import { Component } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiCallService } from '../../shared/services/api-call/api-call.service';
import { SubSink } from 'subsink';

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
    private router: Router) {

  }

  logout(): void {
    this.subs.sink = this.apiService.logout().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.router.navigate([''])
      }
    })
  }

}
