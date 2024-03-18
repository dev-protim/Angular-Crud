import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { ApiCallService } from '../../../../shared/services/api-call/api-call.service';
import { DepartmentDetails } from './department-details';

@Component({
  selector: 'app-department-details',
  standalone: true,
  imports: [],
  templateUrl: './department-details.component.html',
  styleUrl: './department-details.component.scss'
})
export class DepartmentDetailsComponent implements OnInit {

  departmentId: string = "";
  subs = new SubSink();
  departmentDetails: DepartmentDetails = <DepartmentDetails>{};

  constructor(private actr: ActivatedRoute,
    private apiService: ApiCallService) {

  }

  ngOnInit(): void {
    this.departmentId = this.actr.snapshot.params['id'];
    this.getDepartmentDetails(this.departmentId)
  }

  getDepartmentDetails(id: string) {
    this.subs.sink = this.apiService.getSpecificDepartment(id).subscribe(
      (res: any) => {
        if (res.statusCode === 200) {
          this.departmentDetails.name = res.data.DepartmentName;
          this.departmentDetails.details = res.data.DepartmentDetails;
          this.departmentDetails.member = res.data.DepartmentMembers;
        }
        console.log(res)
      }
    )
  }

}
