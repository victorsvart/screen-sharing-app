import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private mediaStream!: MediaStream | null;
  private mediaStreamSubject = new Subject<MediaStream>();
  private recorder: any;
  private blob!: Blob | null;
  private _blob = new Subject<any>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.mediaStream = new MediaStream();
    }
  }

  public async startRecording(): Promise<boolean> {
    return await this.handleRecording();
  }

  public stopRecording() {
    if (!this.recorder)
      return;

    this.recorder.stopRecording(() => {
      if (this.recorder) {
        this.blob = this.recorder.getBlob();
        if (this.blob)
          this._blob.next(URL.createObjectURL(this.blob));

        this.mediaStream?.getTracks().forEach(track => track.stop());
        this.recorder.destroy();
        this.recorder = null;
        this.mediaStream = null;
      }
    });
  }

  public clearRecording() {
    this.blob = null;
    this.recorder = null;
    this.mediaStream = null;
  }

  public getMediaStream(): Observable<MediaStream> {
    if (isPlatformBrowser(this.platformId)) {
      return this.mediaStreamSubject.asObservable();
    } else {
      return new Observable<MediaStream>();
    }
  }

  public getBlob(): Observable<Blob> {
    return this._blob.asObservable();
  }

  private async handleRecording(): Promise<boolean> {
    try {
      if (isPlatformBrowser(this.platformId)) {
        this.mediaStream = await navigator.mediaDevices.getDisplayMedia({
          audio: true,
          video: true,
        });

        this.mediaStreamSubject.next(this.mediaStream);
        const RecordRTC = (await import('recordrtc')).default;
        this.recorder = new RecordRTC(this.mediaStream, { type: 'video' });
        this.recorder.startRecording();
        return true;
      }
    } catch (error) {
      return false;
    }

    return false;
  }
}
