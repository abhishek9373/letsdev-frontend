// socket-config.service.ts
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketConfigService {

  constructor(private socket: Socket) { }

  updateSocketConfig(): void {
    const token = localStorage.getItem('authToken');
    this.socket.ioSocket.io.opts.query = {
      token: token
    };
    this.socket.connect()
  }
}
