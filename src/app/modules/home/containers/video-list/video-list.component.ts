import { Video } from './../../../../core/models/video';
import { Component } from '@angular/core';
import { VideolistService } from './video-list.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

const DATE_FORMAT = 'MM/dd/YYYY';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent {
  videos: Video[] = [];
  user!: User;

  title = 'SPLYZA';
  constructor(
    private videolistService: VideolistService,
    private userService: UserService,
    private datePipe: DatePipe,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((users) => {
      this.user = users;
    });
    this.videolistService.getAll().subscribe((videolist) => {
      videolist.map((x) => {
        this.videos.push({
          id: x.id,
          author: x.author,
          createdDate: this.datePipe.transform(x.createdDate, DATE_FORMAT.toString()) || '',
          title: x.title,
          previewUrl: x.previewUrl,
        });
      });
    });
  }

  imageOnClick(video: Video) {
    this.router.navigateByUrl(`videos/${video.id}`);
  }

  // onKey(event: KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     // this.imageOnClick(event);
  //   }
  // }
}
