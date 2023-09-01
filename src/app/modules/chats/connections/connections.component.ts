import { Component, OnInit } from '@angular/core';
import { Connection, ConnectionResp } from 'src/app/interfaces/Chat.interface';
import { ChatService } from 'src/app/services/chat.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  constructor(private chatService: ChatService){ }

  connections!: Array<Connection>;
  //  [ { connection_id:"",last_message:"",last_message_date:"",notifications:0,user:{_id:"",name:""} } ]

  ngOnInit(): void {
    try{
      this.chatService.loadConnections().subscribe((data: ConnectionResp)=>{
        this.connections = data.data;
      })
    }catch(err){
      ToastService.toast("Error while loading connections");
      throw(err);
    }
  }

}
