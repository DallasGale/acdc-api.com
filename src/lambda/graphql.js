const { ApolloServer, gql } = require("apollo-server-lambda");
const resolvers = require("./resolvers");
const AlbumAPI = require("./datasources/album");

const typeDefs = gql`
  type Query {
    albums: [Album]!
    album(id: ID!): Album
  }

  type Album {
    id: ID!
    title: String
    year_released: String
    tracks: [Track]
    is_live_recording: Boolean
    is_studio_recording: Boolean
    producers: String
  }

  type Chart {
    id: ID
    name: String
    year: Int
    peaked: Int
    lowest_position: Int
  }

  type Certifications {
    id: ID
    region: String
    certification: String
    units_sales: String
  }

  type Track {
    id: ID
    title: String
    length: String
  }

  type Writer {
    id: ID
    name: String
  }

  type Musician {
    id: ID
    name: String
    instrument: String
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // introspection: true,
  playground: true,
  dataSources: () => ({
    albumAPI: new AlbumAPI()
  })
});

// server.listen().then(({ url }) => {
//   console.log(`Server started... ${url}`);
// });

exports.handler = server.createHandler();
