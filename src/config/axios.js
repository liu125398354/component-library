/**
 * Created by liunannan on 2021/11/9.
 */
import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : process.env.NODE_ENV === 'production'
    ? 'https://liu125398354.github.io' : 'https://liu125398354.github.io',
  timeout: 10000
})

// Add a request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
service.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  response => {
    const res = response.data
    return res
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default service
