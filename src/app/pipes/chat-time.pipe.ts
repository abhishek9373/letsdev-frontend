import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatTimestamp'
})
export class ChatTimePipe implements PipeTransform {
  transform(timestamp: string): string {
    if (!timestamp) {
      return '';
    }

    const parsedTimestamp = new Date(timestamp);
    const now = new Date();

    if (this.isSameDay(now, parsedTimestamp)) {
      // If the chat was created on the same day, return only the time
      return parsedTimestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // If the chat was created on a different day, return the full date and time
      return parsedTimestamp.toLocaleString();
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
