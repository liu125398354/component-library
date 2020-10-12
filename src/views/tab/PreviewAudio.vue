<template>
  <div class="p-music">
    <el-button type="success" @click="preview">播放音频</el-button>
    <preview-music
      @clearPreMusic="clearPreMp3"
      :musicBlob="altMusic"
      :previewMusicDialog="previewMusicDialog">
    </preview-music>
  </div>
</template>

<script>
  import PreviewMusic from '@/components/PreviewMusic'
  export default {
    data() {
      return {
        altMusic: null,
        previewMusicDialog: false
      }
    },
    methods: {
      clearPreMp3() {
        this.previewMusicDialog = false
        this.altMusic = null
      },
      preview() {
        this.previewMusicDialog = true
        let self = this
        setTimeout(function() {
          self.altMusic = require('@/assets/music/宇桐非 - 擦肩而过.mp3')
        }, 3000)
      }
    },
    components: {
      PreviewMusic
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../styles/preview.styl'
  .p-music
    padding: 30px
</style>
