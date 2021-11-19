/**
 * Created by liunannan on 2021/11/10.
 */
import request from '@/config/axios'

export default {
  getCaptcha(params) {
    return request({
      url: '/captcha',
      method: 'get',
      params: params
    })
  },
  checkCaptcha(params) {
    return request({
      url: '/check/captcha',
      method: 'post',
      data: params
    })
  }
}