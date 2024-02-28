import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, IUser } from '../interfaces/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  apiURL: string = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) { }

  // Used to make a GET request to the API
  get<T>(endpoint: string, options?: Options) {
    const url = this.apiURL+endpoint;
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  // Used to make a POST request to the API
  post<T>(endpoint: string, body: IUser, options: Options): Observable<T> {
    const url = this.apiURL+endpoint;
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  // Used to make a PUT request to the API
  put<T>(endpoint: string, body: IUser, options?: Options): Observable<T> {
    const url = this.apiURL+endpoint;
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  // Used to make a DELETE request to the API
  delete<T>(endpoint: string, options?: Options): Observable<T> {
    const url = this.apiURL+endpoint;
    return this.httpClient.delete<T>(url, options) as Observable<T>;
  }
}