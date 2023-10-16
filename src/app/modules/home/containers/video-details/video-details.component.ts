import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideolistService } from '../video-list/video-list.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reaction, ReactionType, Video } from 'src/app/core/models/video';
import { VideoService } from 'src/app/core/services/videos.service';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent {
  @ViewChild('media') videoPlayer!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;

  video$!: Observable<Video>;
  reactions$!: Observable<Reaction[]>;
  isVideoLoading = true;
  isReactionLoading = true;
  hasVideoData = false;
  hasReactionData = false;
  data!: Video;
  videoId!: string;
  api!: VgApiService;
  user!: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videolistService: VideolistService,
    private videoService: VideoService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((users) => {
      this.user = users;
    });
    this.activatedRoute.params.subscribe((params) => {
      this.videoId = params['id'];
      this.video$ = this.videolistService.getById(params['id']).pipe(
        map((data: any) => {
          this.isVideoLoading = false;
          if (data && data.length) {
            this.hasVideoData = true;
          } else {
            this.hasVideoData = false;
          }
          // console.log(data.url);
          return data;
        }),
      );
      this.reactions$ = this.videoService.getReactionsById(params['id']).pipe(
        map((data: Reaction[]) => {
          this.isReactionLoading = false;
          if (data && data.length) {
            this.hasReactionData = true;
          } else {
            this.hasReactionData = false;
          }
          return data;
        }),
      );
    });
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
  }

  snapshotOnClick() {
    const video: HTMLVideoElement = this.videoPlayer?.nativeElement;
    const canvas: HTMLCanvasElement = this.canvas?.nativeElement;
    const ctx: any = canvas.getContext('2d');
    const seconds = video.currentTime;
    canvas.width = video?.videoWidth;
    canvas.height = video?.videoHeight;
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const base64Image = canvas.toDataURL('image/png');

    this.reactions$ = this.videoService
      .addReaction(this.videoId, {
        videoId: this.videoId,
        type: ReactionType.SNAP,
        timeframe: seconds,
        dataUri: base64Image,
      })
      .pipe(
        map((data: Reaction[]) => {
          this.isReactionLoading = false;
          if (data && data.length) {
            this.hasReactionData = true;
          } else {
            this.hasReactionData = false;
          }
          return data;
        }),
      );
  }
  reactionOnClick(reaction: Reaction) {
    this.api.currentTime = reaction.timeframe;
    this.api.pause();
  }
  reactionOnKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.home();
    }
  }
  starOnClick() {
    const video: HTMLVideoElement = this.videoPlayer?.nativeElement;
    const seconds = video.currentTime;
    this.reactions$ = this.videoService
      .addReaction(this.videoId, {
        videoId: this.videoId,
        type: ReactionType.STAR,
        timeframe: seconds,
      })
      .pipe(
        map((data: Reaction[]) => {
          this.isReactionLoading = false;
          if (data && data.length) {
            this.hasReactionData = true;
          } else {
            this.hasReactionData = false;
          }
          return data;
        }),
      );
  }
  home() {
    this.router.navigate(['/']);
  }
  onKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.home();
    }
  }
}
