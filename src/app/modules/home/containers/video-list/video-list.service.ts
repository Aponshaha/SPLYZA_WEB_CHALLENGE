import { Video } from './../../../../core/models/video';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendApis } from 'src/app/config/apis';
import { RestDataSource } from 'src/app/core/rest-data-resource';
import { environment } from 'src/enviornments/environment';

backendApis;
@Injectable({
  providedIn: 'root',
})
export class VideolistService extends RestDataSource<Video> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, backendApis.videosApi);
  }
}
