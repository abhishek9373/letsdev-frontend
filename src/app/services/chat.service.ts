import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { outGoingChat } from '../interfaces/Chat.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket, private baseService: BaseService) {
    this.getMessage().subscribe(()=>{});
  }

  sendMessage(chat: outGoingChat) {
    this.socket.emit('chat', chat);
  }
  getMessage() {
    return this.socket.fromEvent('chat-to-reciever').pipe(map((data: any) => console.log(data)));
  }

  loadChats({ rid }: { rid: string}){
    return this.baseService.fetch({ method: "GET", url: `/chat?rid=${rid}`, options: {} });
  }
}
