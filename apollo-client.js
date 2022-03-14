import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  // uri: 'http://localhost:3000/',
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache(),
});

export default client;
