import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache,ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const uri = 'https://apparent-monkey-36.hasura.app/v1/graphql';
const HASURA_SECRET = 'zCxoXko5DE1uwwpboLBq70PBF7CVAVzMU1AdYG9Tg0yaJguq14tiNKjt2APLaJ3V';

export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': HASURA_SECRET,
      },
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('authToken');

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `JWT ${token}`
        }
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  }
}

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink]
  }]
})

export class GraphQLModule {}