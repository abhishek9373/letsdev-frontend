import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private sound: Howl;

  constructor() {
    this.sound = new Howl({
      src: ['assets/sounds/notification.mp3']
    });
  }

  playNotificationSound() {
    this.sound.play();
  }
}
