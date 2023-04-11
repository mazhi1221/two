import axios from 'axios';
import { ElMessage, ElLoading } from 'element-plus';
import { getItem } from "@/utils/storage";

let loadingInstance = null;
let service = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/',
  baseURL: "http://71.137.1.162:8000",
  timeout: 1000 * 60 * 40,
});
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 数据请求拦截
service.interceptors.request.use((config) => {
  const { url, method } = config;
  //避免接口走缓冲数据
  if(method === "get") {
    url.indexOf('?') === -1 ? config.url = url+'?t='+(new Date().getTime()) : config.url = url+'&t='+(new Date().getTime())
  }
  config.headers.Authorization = getItem("authorization") || "";
  // loadingInstance = ElLoading.service({
  //   fullscreen: true,
  //   background: "rgba(122, 122, 122, 0.8)",
  // })
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 返回响应数据拦截
service.interceptors.response.use((res) => {
  const { status, data } = res;
  // loadingInstance.close();
  if (status === 200) {
    return Promise.resolve(data);
  }
}, (error) => {
  if (error.response?.status) {
    // loadingInstance.close();
    // 状态码超过 2xx 范围时都会调用该函数，处理错误响应
    switch (error.response.status) {
      case 404:
        ElMessage({
          type: 'error',
          message: '请求路径找不到！',
          showClose: true
        });
        break;
      case 502:
        ElMessage({
          type: 'error',
          message: '服务器内部报错！',
          showClose: true
        });
        break;
      default:
        break;
    }
  }
  return Promise.reject(error);
});

export default service;
