import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { APIResponse } from '../../interfaces/api-response';
import { Test } from '../../interfaces/test';
import { ExamService } from '../../service/exam.service';

@Component({
  selector: 'app-exam-dashboard',
  templateUrl: './exam-dashboard.component.html',
  styleUrls: ['./exam-dashboard.component.scss']
})
export class ExamDashboardComponent implements OnInit {

  testData: Test;
  testId:string;
  test$: Observable<APIResponse>
  display: string;
  constructor(private examService: ExamService,
    private activeRoute: ActivatedRoute,private route: Router) {
      this.activeRoute.params.subscribe((params) => {
        this.testId = params.id;
        console.log(this.testId);
      });
     }
  
  ngOnInit(): void {
    this.test$ = this.examService.getExamDetailsById(this.testId);
    this.test$.subscribe(test =>{
      
        this.testData = test.result as Test;
      console.log(test);

        this.timer(parseInt(this.testData.Duration.split(" ")[0]))
    });
  }

  onSubmit(){
    this.examService.saveTestResultOfUser(this.testData)
    this.route.navigateByUrl(`/login`,{replaceUrl: true});
  }


  timer(minute) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        clearInterval(timer);
        this.onSubmit();
      }
    }, 1000);
  }

}
