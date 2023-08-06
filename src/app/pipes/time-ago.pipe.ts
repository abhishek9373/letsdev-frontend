import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string): string {
    const currentTime = new Date();
    const pastTime = new Date(value);

    const timeDifference = currentTime.getTime() - pastTime.getTime();
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return 'less than a minute ago';
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (seconds < 2592000) {
      const days = Math.floor(seconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (seconds < 31536000) {
      const months = Math.floor(seconds / 2592000);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(seconds / 31536000);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  }
}
