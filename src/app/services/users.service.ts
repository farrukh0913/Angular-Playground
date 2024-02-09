import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IUser } from '../interfaces/types';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})


export class UsersService {
  constructor(private readonly apiService: ApiService) {}

  // Getting products from the API
  getUsers = (
    url: string,
    params?: any
  ): Observable<IUser> => {
    return this.apiService.get(url);
  };

  // Adding a product via the API
  addUser = (endpoint: string, body: any): Observable<any> => {
    return this.apiService.post(endpoint, body, {});
  };

  // Editing a User via the API
  updateUser = (endpoint: string, body: any, params?: Params): Observable<any> => {
    return this.apiService.put(endpoint, body, params);
  };

  // Deleting a User via the API
  deleteUser = (endpoint: string): Observable<any> => {
    return this.apiService.delete(endpoint);
  };
}