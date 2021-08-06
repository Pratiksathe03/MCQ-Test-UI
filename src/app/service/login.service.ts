import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Constants } from 'src/app/shared/constant';
import { APIResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  register(username:string, email: string): Observable<APIResponse>{
    const url = environment.baseUrl + Constants.loginUrl
    const httpOptions = {
      headers: new HttpHeaders({ 
        'content-type': 'application/json'
         })
    };
    const user:User={
      Email: email,
      Name: username
    }
    return this.http.post<APIResponse>(url,user,httpOptions)
  }
}
