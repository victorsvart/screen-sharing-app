import { NgModule } from '@angular/core';
import { VideoSharingComponent } from './video-sharing/video-sharing.component';
import { VideoService } from '../services/video-service/video.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    VideoSharingComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [VideoService]
})
export class ViewsModule { }
