import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { outGoingChat } from '../interfaces/Chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
    this.getMessage().subscribe(()=>{});
  }

  sendMessage(chat: outGoingChat) {
    this.socket.emit('chat', chat);
  }
  getMessage() {
    return this.socket.fromEvent('chat-to-reciever').pipe(map((data: any) => console.log(data)));
  }
}
