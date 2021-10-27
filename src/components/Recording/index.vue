<template>
  <div class="screen-container">
    <div class="screen-btn">
      <el-button type="primary" @click="startRecord" :disabled="sFlag">开始</el-button>
      <el-button type="danger" @click="endRecord" :disabled="!sFlag">结束</el-button>
      <el-button type="success" @click="downloadRecord" :disabled="dFlag">下载</el-button>
    </div>
    <video id="video" controls width="600px"></video>
  </div>
</template>

<script>
  export default {
    props: {
      recordType: {
        type: String,
        default() {
          return 'screen'
        }
      }
    },
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
      startRecord() {
        if (this.recordType === 'screen') {
          if (navigator && navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices.getDisplayMedia({
              video: true,
              audio: true,
              cursor: 'always'
            }).then(stream => {
              this.handleMedia(stream)
              // onend可以捕获到停止共享事件
              // stream.getVideoTracks()[0].onended = async ()=>{
              //   console.log('aaaaaa')
              // }
            }).catch(err => {
              // 获取摄像头失败，可以通过 err.name 或者 err.message 来判断错误原因，err并没有返回错误错误码
              console.log('err--->', err)
            })
          } else {
            // 浏览器不支持获取屏幕共享，有可能是当前页面不是https，也可能是当前浏览器不支持屏幕共享
          }
        } else if (this.recordType === 'camera') {
          let constraints = { audio: true, video: { width: 1280, height: 720 } }
          // let options = { mimeType: 'video/webm;codecs=h264' }
          navigator.mediaDevices.getUserMedia(constraints).then(stream => {
              this.handleMedia(stream)
          }).catch(err => {
            console.log(err.name + ': ' + err.message)
          })
        }
      },
      endRecord() {
        if (this.recordType === 'screen') {
          let tracks = this.videoElement.srcObject.getTracks()
          tracks.forEach(track => track.stop())
        }
        this.mediaRecorder.stop()
      },
      downloadRecord() {
        let blob = new Blob(this.chunks, { type: 'video/ogg; codecs=opus' })
        let url = window.URL.createObjectURL(blob)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'video.webm')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      },
      handleMedia(stream) {
        this.chunks = []
        this.sFlag = true
        this.dFlag = true
        // 返回的是Mediastream，并不是videotrack
        // let videoTrack = mediastream.getVideoTracks()[0]
        this.mediaRecorder = new MediaRecorder(stream)
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
        window.URL.revokeObjectURL(this.videoElement.src)
        this.videoElement.srcObject = stream
        this.videoElement.play()
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
