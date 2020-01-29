module.exports = {
  Query: {
    albums: (_, __, { dataSources }) => dataSources.albumAPI.getAllAlbums(),
    album: (_, { id }, { dataSources }) =>
      dataSources.albumAPI.getAlbumById({ albumId: id })
  }
};
