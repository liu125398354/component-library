<template>
  <div class="camera-container">
    <div class="screen-btn">
      <el-button type="primary" @click="startRecordCamera" :disabled="sFlag">开始</el-button>
      <el-button type="danger" @click="endRecordCamera" :disabled="!sFlag">结束</el-button>
      <el-button type="success" @click="downloadRC" :disabled="dFlag">下载</el-button>
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
      startRecordCamera() {
        let constraints = { audio: true, video: { width: 1280, height: 720 } }
        let self = this
        let options = { mimeType: 'video/webm;codecs=h264' }
        navigator.mediaDevices.getUserMedia(constraints)
          .then(stream => {
            this.chunks = []
            self.sFlag = true
            self.dFlag = true
            self.mediaRecorder = new MediaRecorder(stream, options)
            self.mediaRecorder.start()
            self.mediaRecorder.ondataavailable = function(e) {
              console.log('available', e)
              self.sFlag = false
              self.dFlag = false
              self.chunks.push(e.data)
              let videoUrl = URL.createObjectURL(e.data, { type: 'video/ogg' })
              self.videoElement.srcObject = null
              self.videoElement.src = videoUrl
              self.videoElement.autoplay = false
            }
            window.URL.revokeObjectURL(this.videoElement.src)
            self.videoElement.srcObject = stream
            self.videoElement.play()
          })
          .catch(err => {
            console.log(err.name + ': ' + err.message)
          })
      },
      endRecordCamera() {
        this.sFlag = false
        this.dFlag = false
        this.mediaRecorder.stop()
      },
      downloadRC() {
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
  .camera-container
    padding: 30px
    .screen-btn
      margin-bottom: 10px
</style>
