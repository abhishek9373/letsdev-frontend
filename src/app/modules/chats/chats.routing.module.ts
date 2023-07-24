import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// componets
import { ChatpageComponent } from "./chatpage/chatpage.component";
import { ConnectionsComponent } from "./connections/connections.component";

const routes: Routes = [
  { path: '', component: ConnectionsComponent },
  { path: ':id', component: ChatpageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
