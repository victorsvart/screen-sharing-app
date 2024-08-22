import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { VideoService } from '../../services/video-service/video.service';

type State = "none" | "recording" | "stopped";

@Component({
  selector: 'app-video-sharing',
  templateUrl: './video-sharing.component.html',
  styleUrl: './video-sharing.component.css'
})
export class VideoSharingComponent {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  title: string = 'recording-with-rtc';
  videoBlobUrl: string | null = null;
  video!: HTMLVideoElement;
  state: State = "none";

  constructor(private videoService: VideoService, private ref: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.video = this.videoElement.nativeElement;
    this.start();
  }

  async startRecording() {
    let started = await this.videoService.startRecording();
    if (started == false) {
      this.state = "none";
      window.alert("Compartilhamento cancelado");
      return;
    }
    this.state = "recording";
  }

  stopRecording() {
    this.videoService.stopRecording();
    this.state = 'stopped';
  }

  clearRecording() {
    this.videoService.clearRecording();
    if (this.video) {
      this.video.srcObject = null;
      this.state = 'none';
    }
  }

  private start() {
    this.getMediaStream();
    this.getBlobUrl();
  }

  private getBlobUrl() {
    this.videoService.getBlob().subscribe((result: Blob) => {
      var binaryData = [];
      binaryData.push(result);
      window.URL.createObjectURL(new Blob(binaryData, { type: "video/webm" }))
      this.ref.detectChanges();
    });
  }

  private getMediaStream() {
    if (typeof window !== 'undefined' && this.video) {
      this.videoService.getMediaStream().subscribe((result: MediaStream) => {
        this.video.srcObject = result;
      });
    }
  }
}
