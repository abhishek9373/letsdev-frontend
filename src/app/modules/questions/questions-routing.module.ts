import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { AnswerComponent } from './answer/answer.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MylistComponent } from './mylist/mylist.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
      { path: '', component: ListComponent},
      { path: 'create', component: CreateComponent },
      { path: 'myquestions', component: MylistComponent },
      { path: ':id', children: [
        { path: '', component: ViewComponent },
        { path: 'answer', component: AnswerComponent },
      ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
