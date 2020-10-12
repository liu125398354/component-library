<template>
  <div class="p-video">
    <el-button type="primary" @click="preview">播放视频</el-button>
    <preview-video
      @clearPreVideo="clearPreBlob"
      :videoBlob="altBlob"
      :previewVideoDialog="previewVideoDialog"
      :videoLoading="videoLoading">
    </preview-video>
  </div>
</template>

<script>
  import PreviewVideo from '@/components/PreviewVideo'
  export default {
    data() {
      return {
        altBlob: null,
        previewVideoDialog: false,
        videoLoading: false
      }
    },
    methods: {
      clearPreBlob() {
        this.previewVideoDialog = false
        this.videoLoading = false
        this.altBlob = null
        console.log('清理视频')
      },
      preview() {
        this.previewVideoDialog = true
        this.videoLoading = true
        let self = this
        setTimeout(function() {
          self.altBlob = require('@/assets/video/example.mp4')
          self.videoLoading = false
        }, 3000)
      }
    },
    components: {
      PreviewVideo
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../styles/preview.styl'
  .p-video
    padding: 30px
</style>
