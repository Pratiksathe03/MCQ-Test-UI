import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { APIResponse } from '../../interfaces/api-response';
import { User } from '../../interfaces/user';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:any;
  email:any;
  user$: Observable<APIResponse>; 
  user: User;

  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit(): void {
    
  }

  callToLoginAPI(){
    this.user$ = this.loginService.register(this.username, this.email)
    this.user$.subscribe((response)=>{
      console.log(response);
      if(response.status === 200){
        this.user = response.result as User;
        console.log("==========",this.user);
        
        localStorage.setItem("user",JSON.stringify(this.user) )
        this.route.navigateByUrl(`/exam/${this.user.Test.Id.toLowerCase()}`,{replaceUrl: true});
        return
      }
      alert(response.message);
    },
    
    (err) => {
      if(err.status===404){
        alert('User not found');
        console.log("User not found");
      }
    });
    
  }

}
