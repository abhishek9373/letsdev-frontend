import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinalQuestion, Question, questionsResult, singleQuestionResult } from 'src/app/interfaces/Question.interface';
import { QuestionService } from 'src/app/services/question.service';
import { ToastService } from 'src/app/services/toast.service';
import hljs from 'highlight.js';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  questionId!: string;
  question: FinalQuestion = { _id: "", code: { code: "", language: "" }, createdAt: new Date, description: "", output: "", title: "", user: { _id: "", name: "" } }
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private questionService: QuestionService) { }
  ngOnInit(): void {
    try {
      LoaderService.loader(true)
      this.activatedRoute.params.subscribe((param: any) => {
        this.questionId = param.id;
        this.questionService.get(this.questionId).subscribe((data: questionsResult) => {
          const finalQ = data.data.question.map((q: Question) => {
            q.code = JSON.parse(q.code);
            return q;
          })
          // @ts-ignore
          this.question = finalQ[0];
          LoaderService.loader(false);
        })
      })
      hljs.highlightAll();
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error)
    }
  }
}
