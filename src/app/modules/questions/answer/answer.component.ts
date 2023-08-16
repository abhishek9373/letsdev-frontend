import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// @ts-ignore
import * as ace from 'ace-builds/src-min-noconflict/ace';
import { QuestionService } from 'src/app/services/question.service';
import { CreateAnswerI } from 'src/app/interfaces/Question.interface';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit, AfterViewInit {

  private editor: ace.Ace.Editor;
  isHide: boolean = true;
  language!: string;

  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService, private router: Router) { }

  questionId!: string;
  ngOnInit(): void {
    try {
      this.activatedRoute.params.subscribe((param: any) => {
        this.questionId = param.id;
      })
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error);
    }
  }

  // Reactive form code here

  answerForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
  })

  get description() {
    return this.answerForm.get('description');
  }

  // create question
  create() {
    try {
      if (!this.answerForm.valid) {
        ToastService.toast("description is required to create answer");
        return;
      }
      const formatedCode: string = this.editor.getValue();
      if (formatedCode.length <= 0) {
        const codeObject = { language: this.language, code: formatedCode }
        const stringCode: string = JSON.stringify(codeObject);
        const description: any = this.answerForm.value.description;
        const answerObject: CreateAnswerI = { description: description }
        this.questionService.createAnswer(answerObject, this.questionId).subscribe((data) => {
          if (data.data) {
            ToastService.toast("answer submitted");
            this.router.navigate(['/questions', this.questionId]);
          }
        })
      }
      else {
        const codeObject = { language: this.language, code: formatedCode }
        const stringCode: string = JSON.stringify(codeObject);
        const description: any = this.answerForm.value.description;
        const answerObject: CreateAnswerI = { description: description, code: formatedCode }
        this.questionService.createAnswer(answerObject, this.questionId).subscribe((data) => {
          if (data.data) {
            ToastService.toast("answer submitted");
            this.router.navigate(['/questions', this.questionId]);
          }
        })
      }
    } catch (error: any) {
      ToastService.toast(error.message);
      throw (error);
    }
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/monokai');
    this.editor.session.setMode('ace/mode/javascript');
    this.editor.setOption('highlightActiveLine', false);

    // Enable Autocompletion and Snippets (basic)
    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
    });
  }

  changeLanguage(language: string): void {
    if (this.editor) {
      const mode = `ace/mode/${language}`;
      this.editor.session.setMode(mode);
      this.language = language;
      this.isHide = !this.isHide;
    }
  }

  selection() {
    this.isHide = !this.isHide;
  }

}
