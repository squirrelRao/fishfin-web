import axios from 'axios';
const service = axios.create({
  timeout: 1000 * 60
});

 // 2.1.请求拦截的作用
 service.interceptors.request.use(config => {
  return config
}, err => {
  console.log(err);
})
// 2.2.响应拦截
service.interceptors.response.use(res => {
  return res.data
}, err => {
  console.log(err);
})

const config = {
  'production' : 'http://localhost:8080',
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