import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export abstract class RestDataSource<T> {
  constructor(
    protected httpClient: HttpClient,
    protected baseUrl: string,
  ) {}

  getAll(): Observable<T[]> {
    return this.httpClient.get(this.baseUrl).pipe(
      catchError((err: Error) => this.errorHandelar(err)),
      map((data: any) => data),
    );
  }

  getById(id: string): Observable<T> {
    return this.httpClient.get(`${this.baseUrl}/${id}`).pipe(
      catchError((err: any) => this.errorHandelar(err)),
      map((data: any) => data),
    );
  }

  update(id: string, entityToBeUpdated: Partial<T> | any): Observable<null> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, entityToBeUpdated).pipe(
      catchError((err: any) => this.errorHandelar(err)),
      map((data: any) => data?.result),
    );
  }

  getUser(): Observable<T> {
    return this.httpClient.get(this.baseUrl).pipe(
      catchError((err: any) => this.errorHandelar(err)),
      map((data: any) => data),
    );
  }

  errorHandelar(err: any) {
    console.log(err);
    return of(null);
  }
}
