import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSharingComponent } from './video-sharing.component';

describe('VideoSharingComponent', () => {
  let component: VideoSharingComponent;
  let fixture: ComponentFixture<VideoSharingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoSharingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
