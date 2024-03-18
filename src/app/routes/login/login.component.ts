import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCallService } from '../../shared/services/api-call/api-call.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: any;
  subs = new SubSink();

  constructor(private fb: FormBuilder,
    private apiService: ApiCallService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
			email: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});
  }

  submit(): void {
    let data = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }
    this.subs.sink = this.apiService.login(data).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.router.navigate(['/dashboard'])
      }
      console.log(res)
    })
  }

}
