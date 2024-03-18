import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  url: string = "http://127.0.0.1:8000/"

  constructor(private httpClient: HttpClient) { }

  login(body: any): any {
    return this.httpClient.post(`${this.url}/api/login`, body).pipe(
			map((res: any) => {
				return res;
			})
		);
  }

  logout(body?: any): any {
    return this.httpClient.post(`${this.url}/api/logout`, body).pipe(
			map((res: any) => {
				return res;
			})
		);
  }

  getDepartments(): any {
    return this.httpClient.get(`${this.url}/department`).pipe(
			map(res => res)
		);
  }

  getSpecificDepartment(id: string): any {
    return this.httpClient.get(`${this.url}/department/${id}`).pipe(
			map(res => res)
		);
  }

  createDepartment(val: any): any {
    return this.httpClient.post(`${this.url}/department/`, val).pipe(
			map(res => res)
		);
  }

  deleteDepartment(id: number): any {
    return this.httpClient.delete(`${this.url}/department/${id}`).pipe(
			map(res => res)
		);
  }
}
