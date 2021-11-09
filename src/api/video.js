/**
 * Created by liunannan on 2021/11/9.
 */

import request from '@/config/axios'

export default {
  getVideo() {
    return request({
      url: '/video/getblob',
      method: 'post'
    })
  }
}
