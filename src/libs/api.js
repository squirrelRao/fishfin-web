import axios from "axios";
// import config from "@/config/config";
import { Message } from "element-ui";

// 创建axios实例
const service = axios.create({
  timeout: 1000*60, // 请求超时时间
});

const config = {
  "production":"http://lab.lakewater.cn",
  "development":"http://lab.lakewater.cn"
}
axios.defaults.baseURL =  config[process.env.NODE_ENV]
axios.defaults.withCredentials = true;

const api_service = {

  http(url = "", method = "get", data = {}) {
    return service({
      url: `${axios.defaults.baseURL}${url}`,
      method: method || "get",
      crossdomain: true,
      data: data,
    });
  }
}

export default api_service;