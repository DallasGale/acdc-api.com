import React, { Component } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql"
});

const GET_ALBUMS = gql`
  {
    albums {
      title
      year_released
    }
  }
`;
const LambdaDemo = () => (
  <ApolloProvider client={client}>
    <Query query={GET_ALBUMS}>
      {({ data, loading, error }) => {
        if (loading) return null;
        if (error) return `Error! ${error}`;

        return (
          <div>
            {!loading &&
              data.albums &&
              data.albums.map(album => (
                <p key={album.title}>
                  {album.title} {album.year_released}
                </p>
              ))}
          </div>
        );
      }}
    </Query>
  </ApolloProvider>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    );
  }
}

export default App;
