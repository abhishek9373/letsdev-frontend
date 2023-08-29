import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiverInfo, outGoingChat } from 'src/app/interfaces/Chat.interface';
import { ChatService } from 'src/app/services/chat.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.css']
})
export class ChatpageComponent {

  myId!: string;
  rid!: string;
  Reciver!: ReceiverInfo;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private chatService: ChatService){
    // get recievers id
    try{
      this.activatedRoute.params.subscribe((p: any)=>{
        this.rid = p.id;
      });
    }catch(error){
      ToastService.toast("Error while grtting userInfo")
    }

    // get recivers info
    try{
      this.userService.getById(this.rid).subscribe((data: any)=>{
        this.Reciver = data;
      });
    }catch(error){
      ToastService.toast("Error while grtting userInfo")
    }

    // get my info
    try{
      this.userService.getOnly().subscribe((data: any)=>{
        this.myId= data._id;
      });
    }catch(error){
      ToastService.toast("Error while grtting userInfo");
    }
  }

  newChatForm = new FormGroup({
    chat: new FormControl('', [Validators.required])
  });

  get chat(){
    return this.newChatForm.get('chat');
  }

  newChat(){
    try{
      if(this.newChatForm.invalid){
        return;
      }
      const text: any = this.newChatForm.value.chat;
      const chat: outGoingChat = { sid: this.myId, rid: this.Reciver._id, text }
      this.chatService.sendMessage(chat);
    }catch(error){
      throw(error);
    }
  }

}
