import axios from 'axios';
const service = axios.create({
  timeout: 1000 * 60
});

const config = {
  'production' : 'http://lab.lakewater.cn',
  'development' : 'http://lab.lakewater.cn'
}

axios.defaults.baseURL = config[process.env.NODE_ENV];
axios.defaults.withCredentials = true;

const _api = {

  http( url = '', method = 'get', data = {}){
    return service({
      url: `${axios.defaults.baseURL}${url}`,
      method: method || 'get',
      crossdomain: true,
      data: data
    });
  }
}

export default _api;