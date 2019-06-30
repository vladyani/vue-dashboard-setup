import axios from 'axios';

class RestApiService {
  get(resourceUrl) {
    return axios.get(resourceUrl);
  }
}

export default new RestApiService();
