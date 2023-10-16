import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendApis } from 'src/app/config/apis';
import { RestDataSource } from 'src/app/core/rest-data-resource';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class UserService extends RestDataSource<User> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, backendApis.usersApi);
  }
}
