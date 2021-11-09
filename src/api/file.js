/**
 * Created by liunannan on 2021/11/9.
 */

import request from '@/config/axios'

export default {
  uploadCommonFile(form, config) {
    return request({
      ...config,
      url: '/apk/upload',
      method: 'post',
      data: form,
      timeout: 0
    })
  },
  uploadMaxFile(form) {
    return request({
      url: '/uploadChunk',
      method: 'post',
      data: form,
      timeout: 0
    })
  }
}
