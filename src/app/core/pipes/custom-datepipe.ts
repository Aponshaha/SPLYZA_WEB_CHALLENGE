import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTimestamp',
})
export class SecondsToTimestampPipe implements PipeTransform {
  transform(value: number): string {
    // const date = new Date(value * 1000); // Convert to milliseconds
    const hrs = Math.floor(value / 3600);
    const mins = Math.floor((value % 3600) / 60);
    const secs = Math.floor(value % 60);

    return (hrs < 10 ? '0' : '') + hrs + ':' + (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
  }
}
