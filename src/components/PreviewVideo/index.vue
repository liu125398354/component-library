<template>
  <div>
    <el-dialog :visible.sync="previewVideoDialog" :before-close="clearPreVideo" class="img-dialog" width="56%">
      <div class="poster-wrapper"
           v-loading="videoLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <video ref="musicVideo" :src="videoBlob" controls autoplay loop="loop" width="100%" height="100%"></video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      videoBlob: {
        type: String
      },
      previewVideoDialog: {
        type: Boolean,
        default: false
      },
      videoLoading: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clearPreVideo() {
        let video = this.$refs.musicVideo
        if (!video.paused) {
          video.pause()
        }
        this.$emit('clearPreVideo')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
