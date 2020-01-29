const { RESTDataSource } = require("apollo-datasource-rest");

class AlbumAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://acdc-api.herokuapp.com/";
  }

  async getAllAlbums() {
    const response = await this.get("albums");
    console.log("response", response);
    return Array.isArray(response)
      ? response.map(launch => this.albumReducer(launch))
      : [];
  }
  async getAlbumById({ albumId }) {
    const response = await this.get("albums", { id: albumId });
    return this.albumReducer(response[0]);
  }

  getAlbumsByIds({ albumIds }) {
    return Promise.all(albumIds.map(albumId => this.getAlbumById({ albumId })));
  }

  albumReducer(album) {
    return {
      id: album.id,
      title: album.Title,
      year_released: album.YearRecorded,
      tracks: album.tracks,
      is_live_recording: album.IsLiveRecording,
      is_studio_recording: album.IsStudioRecording,
      producers: album.Producer
    };
  }
}

module.exports = AlbumAPI;
