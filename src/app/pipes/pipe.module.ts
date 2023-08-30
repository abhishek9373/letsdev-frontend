import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './truncate.pipe';
import { ChatTimePipe } from './chat-time.pipe';



@NgModule({
  declarations: [TruncatePipe, ChatTimePipe],
  imports: [
    CommonModule
  ],
  exports: [TruncatePipe, ChatTimePipe]
})
export class PipeModule { }
