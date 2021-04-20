import axios from 'axios'

export function request(options) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //过滤器，拦截器
  instance.interceptors.response.use(res => {
    return res.data
  })

  return instance(options)
}
