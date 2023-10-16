import { Reaction, Video } from 'src/app/core/models/video';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { backendApis } from 'src/app/config/apis';
import { RestDataSource } from 'src/app/core/rest-data-resource';
@Injectable({
  providedIn: 'root',
})
export class VideoService extends RestDataSource<Video> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, backendApis.videosApi);
  }

  getReactionsById(id: string): Observable<Reaction[]> {
    return this.httpClient.get(`${this.baseUrl}/${id}/reactions`).pipe(
      catchError((err: Error) => this.errorHandelar(err)),
      map((data: any) => data),
      //   tap(data => console.log())
    );
  }
  addReaction(id: string, reaction: any): Observable<Reaction[]> {
    return this.httpClient.post(`${this.baseUrl}/${id}/reactions`, reaction).pipe(
      catchError((err: Error) => this.errorHandelar(err)),
      map((data: any) => data),
      tap((data) => console.log(data)),
    );
  }
}
