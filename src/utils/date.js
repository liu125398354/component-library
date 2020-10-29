/**
 * Created by liunannan on 2020/10/29.
 */

import axios from 'axios'

export function cpttUnifiedDetail(startTime, endTime) {
  return {
    naturalDay: cpttNaturalDay(startTime, endTime),
    workingDay: cpttWorkingDay(startTime, endTime)
  }
}

function cpttNaturalDay(param1, param2) {
  let date1 = new Date(param2).getTime()
  let date2 = new Date(param1).getTime()
  let diff = Math.abs(date1 - date2)
  return parseInt(diff / (1000 * 60 * 60 * 24)) + 1
}

function cpttWorkingDay(param1, param2) {
  let date1 = new Date(param1)
  let date2 = new Date(param2)
  let delta = (date2 - date1) / (1000 * 60 * 60 * 24) + 1
  let weekEnds = 0
  if (delta < 0) {
    for (let i = delta; i < 0; i++) {
      if (date1.getDay() === 0 || date1.getDay() === 6) {
        weekEnds++
      }
      date1 = date1.valueOf()
      date1 -= 1000 * 60 * 60 * 24
      date1 = new Date(date1)
    }
    return delta + weekEnds
  } else {
    return axios.get('/mock/time.json').then(res => {
      // 设置法定节假日
      let superArr = res.data.holiday
      // 补班
      let makeUpArr = res.data.makeUp
      for (let i = 0; i < delta; i++) {
        let superDate = fmtDate(date1)
        let status = superArr.indexOf(superDate)
        let makeUpStatus = makeUpArr.indexOf(superDate)
        if (date1.getDay() === 0 || date1.getDay() === 6 || status !== -1) {
          weekEnds++
        }
        if (makeUpStatus !== -1) {
          weekEnds--
        }
        date1 = date1.valueOf()
        date1 += 1000 * 60 * 60 * 24
        date1 = new Date(date1)
      }
      return delta - weekEnds
    })
  }
}

function fmtDate(date) {
  let y = 1900 + date.getYear()
  let m = '0' + (date.getMonth() + 1)
  let d = '0' + date.getDate()
  return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
}
