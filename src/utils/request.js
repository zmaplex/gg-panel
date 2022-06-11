import axios from 'axios'
import {Notify} from 'quasar'
import {ACCESS_TOKEN} from "src/utils/mutation-types";


if (process.env.DEV) {
  console.log(`I'm on a development build`)
  console.log(process.env.API)
}

const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.API,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {

  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = window.sessionStorage.getItem(ACCESS_TOKEN)
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = 'token ' + token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)


export default request

export {
  request as axios
}
