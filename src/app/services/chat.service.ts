import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs'; // Import Observable and Subject
import { Chat, outGoingChat } from '../interfaces/Chat.interface'; // Assuming 'Chat' is the correct type
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private newChatSubject = new Subject<Chat>(); // Create a Subject for new chats

  constructor(private socket: Socket, private baseService: BaseService) {
    this.getMessage().subscribe((newChat: Chat) => {
      this.newChatSubject.next(newChat);
    });
  }

  sendMessage(chat: outGoingChat) {
    this.socket.emit('chat', chat);
  }

  // Modify getMessage to return an Observable that can be subscribed to
  getMessage(): Observable<Chat> {
    return this.socket.fromEvent('chat-to-reciever').pipe(map((data: any) => data as Chat));
  }

  // Add a method to subscribe to new chats
  subscribeToNewChats(): Observable<Chat> {
    return this.newChatSubject.asObservable();
  }

  loadChats({ rid }: { rid: string }) {
    return this.baseService.fetch({ method: 'GET', url: `/chat?rid=${rid}`, options: {} });
  }
}
