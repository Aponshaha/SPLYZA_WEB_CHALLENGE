import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoListComponent } from './containers/video-list/video-list.component';
import { VideoDetailsComponent } from './containers/video-details/video-details.component';

const routes: Routes = [
  {
    path: 'videos/:id',
    component: VideoDetailsComponent,
  },
  {
    path: '',
    component: VideoListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
