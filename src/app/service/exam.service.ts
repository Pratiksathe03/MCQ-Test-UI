import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from 'src/app/shared/constant';
import { APIResponse } from '../interfaces/api-response';
import { Test } from '../interfaces/test';
import { User } from '../interfaces/user';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient, private utility: UtilityService) { }
  getExamDetailsById(id:string): Observable<APIResponse>{
    const url = environment.baseUrl + Constants.exam +`/${id}`
    return this.http.get<APIResponse>(url)
  }

saveTestResultOfUser(test:Test){
    const url = environment.baseUrl + Constants.result
    test.Score = this.utility.calculateMarks(test.Questions)
    test.Result = (test.Score/test.TotalMarks)*100 > 40 ? "pass" : "fail"
    const user: User  = JSON.parse(localStorage.getItem("user")) as User;
    user.Test = test;
    const httpOptions = {
      headers: new HttpHeaders({ 
        'content-type': 'application/json'
         })
    };
    console.log(user);
    
    if(test.Result =="pass")
    alert(`Congratulations! Your test result is Pass with score ${test.Score}`)
  else{
    alert(`Oops! Try again you are failed. Your score is ${test.Score}`)
  }
     localStorage.clear();
     this.http.post<APIResponse>(url,user,httpOptions).subscribe((res)=>
      console.log(res),
      (err)=>console.log(err)
      
      )
  }
}
