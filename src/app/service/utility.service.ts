import { Injectable } from '@angular/core';
import { Question } from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  calculateMarks(questions:Question[]):number{
    let marks:number=0;
   questions.forEach(
     que =>{
     if(que.correctOption.toLowerCase() === que.selectedOption?.toLowerCase())
     {
      marks += que.marks;
     }}
   )
   return marks;
  }
}
