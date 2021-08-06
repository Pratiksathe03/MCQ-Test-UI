export interface Question{
    id: string;
    question: string;
    options: string[];
    marks: number;
    correctOption: string;
    selectedOption?: string;
}