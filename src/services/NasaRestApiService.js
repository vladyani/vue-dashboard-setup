import restApiService from './RestApiService';

const NASA_API_URL = 'https://images-api.nasa.gov';

class NasaRestApiService {
  getImages(params) {
    return restApiService.get(`${NASA_API_URL}/search${params || ''}`);
  }
}

export default new NasaRestApiService();
