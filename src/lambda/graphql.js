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
    released: Date
    tracks: [Track]
    is_live_recording: Boolean
    is_studio_recording: Boolean
    producers: String
    peak_chart_position: [Chart]
  }

  type Chart {
    id: ID
    association: String
    position: Int
    year: Int
  }

  type Certifications {
    id: ID
    region: String
    certification: String
    units_sold: String
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

  type Performer {
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
