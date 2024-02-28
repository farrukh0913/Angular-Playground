import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from "rxjs"
import { map } from "rxjs/operators"

@Injectable()
export class GraphqlService {
  constructor(private apollo: Apollo) { }

  getUsers(): Observable<any> {
    return this.apollo.query({
      query: gql`query GetUsers {
        users {
          id
          _id
          name
        }
      }`
    }).pipe(map((response: any) => response?.data?.users || []))
  }

}