import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoSharingComponent } from './views/video-sharing/video-sharing.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'videoSharing', component: VideoSharingComponent },
  { path: '', redirectTo: 'videoSharing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
