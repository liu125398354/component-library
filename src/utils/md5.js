/**
 * Created by liunannan on 2019/6/10.
 */

import SparkMD5 from 'spark-md5'

export function handleMinFile(file) {
  return new Promise(function(resolve, reject) {
    // 创建FileReader实例
    let fileReader = new FileReader()
    // FileReader的load事件，当文件读取完毕时触发
    fileReader.onload = function(e) {
      // e.target指向上面的fileReader实例
      if (file.size !== e.target.result.length) {
        // 如果两者不一致说明读取出错
        console.log('ERROR:Browser reported success but could not read the file until the end.')
      } else {
        // 计算md5并返回结果
        resolve(SparkMD5.hashBinary(e.target.result))
      }
    }
    // 如果读取文件出错，取消读取状态并弹框报错
    fileReader.onerror = function() {
      // running = false
      console.log('ERROR:FileReader onerror was triggered, maybe the browser aborted due to high memory usage.')
    }
    // 通过fileReader读取文件二进制码
    fileReader.readAsBinaryString(file)
  })
}

export function handleMaxFile(fileRaw) {
  return new Promise(function(resolve, reject) {
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    let fileReader = new FileReader()
    let chunkSize = 1024 * 1024 * 2
    let chunks = Math.ceil(fileRaw.size / chunkSize)
    let currentChunk = 0
    let spark = new SparkMD5.ArrayBuffer()
    fileReader.onload = function (e) {
      spark.append(e.target.result)
      currentChunk++
      if (currentChunk < chunks) {
        loadNext()
      } else {
        resolve(spark.end())
      }
    }
    fileReader.onerror = function () {
      console.warn('FileReader error.')
    }
    function loadNext () {
      let start = currentChunk * chunkSize
      let end = ((start + chunkSize) >= fileRaw.size) ? fileRaw.size : start + chunkSize
      // 注意这里的 fileRaw
      fileReader.readAsArrayBuffer(blobSlice.call(fileRaw, start, end))
    }
    loadNext()
  })
}
