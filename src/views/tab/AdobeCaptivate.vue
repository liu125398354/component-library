<template>
  <div class="screen-container">
    <div class="screen-btn">
      <el-button type="primary" @click="startRecordScreen" :disabled="sFlag">开始</el-button>
      <el-button type="danger" @click="endRecordScreen" :disabled="!sFlag">结束</el-button>
      <el-button type="success" @click="downloadRS" :disabled="dFlag">下载</el-button>
    </div>
    <video id="video" controls width="600px"></video>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        videoElement: null,
        mediaRecorder: null,
        chunks: [],
        sFlag: false,
        dFlag: true
      }
    },
    mounted() {
      this.videoElement = document.getElementById('video')
    },
    methods: {
      startRecordScreen() {
        if (navigator && navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
          navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
            cursor: 'always'
          }).then((mediastream) => {
            this.chunks = []
            this.sFlag = true
            this.dFlag = true
            // 返回的是Mediastream，并不是videotrack
            // let videoTrack = mediastream.getVideoTracks()[0]

            this.mediaRecorder = new MediaRecorder(mediastream)
            this.mediaRecorder.start()
            this.mediaRecorder.ondataavailable = e => {
              console.log('available', e)
              this.sFlag = false
              this.dFlag = false
              this.chunks.push(e.data)
              let videoUrl = URL.createObjectURL(e.data, { type: 'video/ogg' })
              this.videoElement.srcObject = null
              this.videoElement.src = videoUrl
              this.videoElement.autoplay = false
            }
            // console.log('videoTrack', videoTrack)
            // 如果需要播放，则可以直接使用auido播放
            window.URL.revokeObjectURL(this.videoElement.src)
            this.videoElement.srcObject = mediastream
            this.videoElement.play()
          }).catch(err => {
            // 获取摄像头失败，可以通过 err.name 或者 err.message 来判断错误原因，err并没有返回错误错误码
            console.log('err--->', err)
          })
        } else {
          // 浏览器不支持获取屏幕共享，有可能是当前页面不是https，也可能是当前浏览器不支持屏幕共享
        }
      },
      endRecordScreen() {
        let tracks = this.videoElement.srcObject.getTracks()
        tracks.forEach(track => track.stop())
        this.mediaRecorder.stop()
      },
      downloadRS() {
        let blob = new Blob(this.chunks, { type: 'video/ogg; codecs=opus' })
        let url = window.URL.createObjectURL(blob)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'video.webm')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .screen-container
    padding: 30px
    .screen-btn
      margin-bottom: 10px
</style>
