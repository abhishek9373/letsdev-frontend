import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer, FinalQuestion, Question, questionsResult, singleQuestionResult } from 'src/app/interfaces/Question.interface';
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
  answers: Array<Answer> = [{ _id: "", code: "", createdAt: new Date, description: "", user: { name: "", profileViews: 0, stars: 0, _id: "" }, votes: 0, preferences: 0 }]
  question: FinalQuestion = { _id: "", code: { code: "", language: "" }, createdAt: new Date, description: "", output: "", title: "", user: { _id: "", name: "", stars: 0, profileViews: 0 }, preferences: 0, answers: 0, views: 0, votes: 0 }
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
          this.answers = [...data.data.answers];
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

  upVote(question: FinalQuestion) {
    try {
      if(question.preferences == 1){
        return 0;
      }
      this.questionService.upVote(question._id).subscribe((data: any)=>{
        question.preferences = 1;
        question.votes++;
      })
    } catch (error: any) {
      ToastService.toast(error.meassage);
      throw (error);
    }
  }

  downVote(question: FinalQuestion) {
    try {
      if(question.preferences == 2){
        return 0;
      }
      this.questionService.downVote(question._id).subscribe((data: any)=>{
        question.preferences = 2;
        question.votes--;
      })
    } catch (error: any) {
      ToastService.toast(error.meassage);
      throw (error);
    }
  }

  upVoteAnswer(answer: Answer) {
    try {
      if(answer.preferences == 1){
        return;
      }
      this.questionService.upVoteAnswer(this.questionId, answer._id).subscribe((data: any)=>{
        answer.preferences = 1;
        answer.votes++;
      })
    } catch (error: any) {
      ToastService.toast(error.meassage);
      throw (error);
    }
  }

  downVoteAnswer(answer: Answer) {
    try {
      if(answer.preferences == 2){
        return;
      }
      this.questionService.downVoteAnswer(this.questionId, answer._id).subscribe((data: any)=>{
        answer.preferences = 2;
        answer.votes--;
      })
    } catch (error: any) {
      ToastService.toast(error.meassage);
      throw (error);
    }
  }

  // function to copy code button
  CopyCode() : void{
    const codeElement: any = document.querySelector('.question-code');
    navigator.clipboard.writeText(codeElement.textContent).then(function() {
      // Change the button text temporarily to indicate success
      const copyButton: any = document.querySelector('.cc-q');
      copyButton.textContent = 'copied!';
      setTimeout(function() {
          copyButton.textContent = 'copy';
      }, 6000);
  }).catch(function(err) {
      console.error('Unable to copy code: ', err);
  });
  }

  CopyCodeForAnswer(answerId: string) : void{
    const codeElement: any = document.querySelector(`#question-${answerId}`);
    navigator.clipboard.writeText(codeElement.textContent).then(function() {
      // Change the button text temporarily to indicate success
      const copyButton: any = document.querySelector(`#answer-${answerId}`);
      copyButton.textContent = 'copied!';
      setTimeout(function() {
          copyButton.textContent = 'copy';
      }, 6000);
  }).catch(function(err) {
      console.error('Unable to copy code: ', err);
  });
  }
}
