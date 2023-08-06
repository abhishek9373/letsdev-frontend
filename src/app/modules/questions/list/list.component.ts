import { Component, OnInit } from '@angular/core';
import { FinalQuestion, Question, questionsResult } from 'src/app/interfaces/Question.interface';
import { QuestionService } from 'src/app/services/question.service';
import { ToastService } from 'src/app/services/toast.service';
import hljs from 'highlight.js';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  page: number = 0;
  questions: Array<FinalQuestion> = [ { _id:"", code: { code:"", language: "" }, createdAt: new Date, description:"", output: "", title: "", user: { _id: "", name:""}} ]
  constructor(private qustionService: QuestionService){}
  ngOnInit(): void {
    try{
      this.qustionService.list(this.page).subscribe((data: questionsResult)=>{
        const finalQ = data.data.map((q: Question)=>{
          q.code = JSON.parse(q.code);
          return q;
        })
        // @ts-ignore
        this.questions = finalQ;
      })
      hljs.highlightAll();
    }catch(error: any){
      ToastService.toast(error.message);
      throw(error)
    }
  }
}
