import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCallService } from '../../shared/services/api-call/api-call.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { logIn } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: any;

  constructor(private fb: FormBuilder,
    private apiService: ApiCallService,
    private router: Router,
    private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
			email: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});
  }

  submit(): void {
    const data: any = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }
    this.store.dispatch(logIn(data))
  }

}
