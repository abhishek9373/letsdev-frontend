import { Component, AfterViewInit } from '@angular/core';
// @ts-ignore
import * as ace from 'ace-builds/src-min-noconflict/ace';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionService } from 'src/app/services/question.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements AfterViewInit {

  private editor: ace.Ace.Editor;
  isHide: boolean = true;
  language!: string;

  constructor(private questionService: QuestionService, private router: Router) { }

  // create question code here
  questionForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    output: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    code: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)])
  })

  get title(){
    return this.questionForm.get('title');
  }

  get output(){
    return this.questionForm.get('output');
  }

  get code(){
    return this.questionForm.get('code');
  }

  get description(){
    return this.questionForm.get('description');
  }

  createQuestion(){
    try{
      const formatedCode: string = this.editor.getValue();
      if(formatedCode.length <= 0){ return; }
      else{
        const codeObject = { language: this.language, code: formatedCode }
        const stringCode: string = JSON.stringify(codeObject);
        const title: any = this.questionForm.value.title;
        const output: any = this.questionForm.value.output;
        const description: any = this.questionForm.value.description;

        this.questionService.create({ code: stringCode, title, output, description }).subscribe((data)=>{
          if(data?.data){
            ToastService.toast("question posted");
            this.router.navigate(['/questions'])
          }
        })
      }
    }catch(error: any){
      ToastService.toast(error.message);
      throw(error);
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