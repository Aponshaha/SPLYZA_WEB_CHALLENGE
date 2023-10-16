import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SecondsToTimestampPipe } from 'src/app/core/pipes/custom-datepipe';
import { HomeRoutingModule } from './home-routing.module';
import { VideoListComponent } from './containers/video-list/video-list.component';
import { VideoDetailsComponent } from './containers/video-details/video-details.component';
import { HttpClientModule } from '@angular/common/http';
import { LetDirective } from 'src/app/core/directives/let.directive';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

@NgModule({
  declarations: [VideoListComponent, VideoDetailsComponent, LetDirective, SecondsToTimestampPipe],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  exports: [VideoListComponent, VideoDetailsComponent, LetDirective],
  providers: [DatePipe, SecondsToTimestampPipe],
})
export class HomeModule {}
