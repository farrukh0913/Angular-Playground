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
          name
          _id
        }
      }`
    }).pipe(map((response: any) => {
      const users = JSON.parse(JSON.stringify(response?.data?.users || [])); // 👈️ create copy
      users.forEach((user: any) => user["_id"] = user._id.$oid);
      return users;
    }))
  }

}