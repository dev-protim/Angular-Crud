import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubSink } from 'subsink';
import { ApiCallService } from '../../../../shared/services/api-call/api-call.service';
// import { Department } from './department';
import { loadDepartments } from '../../../../store/actions/department.actions';
import { selectDepartmentError, selectDepartmentLoading, selectDepartments } from '../../../../store/selectors/department.selectors';
import { Observable } from 'rxjs';
import { Department } from '../../../../models/department';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  departmentForm: any;
  subs = new SubSink();
  departmentList$: Observable<Department[]> = this.store.select(selectDepartments);

  constructor(private modalService: NgbModal,
    private apiService: ApiCallService,
    private fb: FormBuilder,
    private store: Store) {
  }

  ngOnInit(): void {
    this.getAllDepartment();
    this.departmentForm = this.fb.group({
			name: ['', [Validators.required]],
			member: [0, [Validators.required]],
			details: ['']
		});
  }

  getAllDepartment(): void {
    this.store.dispatch(loadDepartments())
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  onSubmit(): void {
    console.log(this.departmentForm.value)
    if (this.departmentForm.value) {
      let data = {
        "DepartmentName": this.departmentForm.value.name,
        "DepartmentMembers": this.departmentForm.value.member,
        "DepartmentDetails": this.departmentForm.value.details
      }
      this.subs.sink = this.apiService.createDepartment(data).subscribe((res: any) => {
        if (res.statusCode === 201) {
          let data = {
            "id": res.data.DepartmentId,
            "name": res.data.DepartmentName
          }
          // this.departmentList = [...this.departmentList, data];
        }
      })
      this.modalService.dismissAll();
      this.departmentForm.reset();
    }
  }

  deleteDepartment(id: number): void {
    this.subs.sink = this.apiService.deleteDepartment(id).subscribe((res: any) => {
      if (res.statusCode === 200) {
        // var index = this.departmentList.map(x => {
        //   return x.id;
        // }).indexOf(id);
        
        // this.departmentList.splice(index, 1);
      }
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
