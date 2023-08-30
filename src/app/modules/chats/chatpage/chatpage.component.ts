import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat, ReceiverInfo, outGoingChat } from 'src/app/interfaces/Chat.interface';
import { ChatService } from 'src/app/services/chat.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.css']
})
export class ChatpageComponent implements OnInit {

  myId: string = "";
  rid: string = "";
  Reciver: ReceiverInfo = { _id: "", branch: "", gender: "", isVerified: "", name: "" };
  offset: number = Date.now();
  chats: [Chat] = [{ created_at: "", updated_at: "", sid: "", rid: "", text: "" }]

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private chatService: ChatService) {
    // get recievers id
    try {
      this.activatedRoute.params.subscribe((p: any) => {
        this.rid = p.id;
      });
    } catch (error) {
      ToastService.toast("Error while grtting userInfo")
    }

    // get recivers info
    try {
      this.userService.getById(this.rid).subscribe((data: any) => {
        this.Reciver = data;
      });
    } catch (error) {
      ToastService.toast("Error while grtting userInfo")
    }

    // get my info
    try {
      this.userService.getOnly().subscribe((data: any) => {
        this.myId = data._id;
      });
    } catch (error) {
      ToastService.toast("Error while grtting userInfo");
    }

    // subscribe for new incomming chats
    this.chatService.subscribeToNewChats().subscribe((newChat: Chat) => {
      this.chats.push(newChat);
      this.scrollToBottom();
    })
  }

  ngOnInit(): void {
    // load initial chats for users
    try {
      this.chatService.loadChats({ rid: this.rid }).subscribe((data: any) => {
        this.chats = data.data;
        this.scrollToBottom();
      })
    } catch (error) {
      ToastService.toast("error while loading chats");
      throw (error);
    }
  }

  private scrollToBottom() {
    setTimeout(()=>{
      const scrollDiv: any = document.getElementById("main");
      scrollDiv.scrollTo({
        top: scrollDiv.scrollHeight,
        behavior: "smooth",
      });
    }, 1000)
  }

  newChatForm = new FormGroup({
    chat: new FormControl('', [Validators.required])
  });

  get chat() {
    return this.newChatForm.get('chat');
  }

  // create new chat
  newChat() {
    try {
      if (this.newChatForm.invalid) {
        return;
      }
      const text: any = this.newChatForm.value.chat;
      const chat: outGoingChat = { sid: this.myId, rid: this.Reciver._id, text }
      this.chatService.sendMessage(chat);
      const new_chat: Chat = { created_at: new Date(Date.now()).toISOString(), updated_at: new Date(Date.now()).toISOString(), ...chat }
      this.chats.push(new_chat);
      this.newChatForm.reset();
      this.scrollToBottom();
    } catch (error) {
      throw (error);
    }
  }

}
