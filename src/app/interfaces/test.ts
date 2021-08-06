import { Question } from "./question";

export interface Test{
    Id: string;
    Name: string;
    Duration: string;
    Questions: Question[];
    Score:number;
    Result:string,
    TotalMarks:number;
}