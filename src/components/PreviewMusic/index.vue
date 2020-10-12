<template>
  <div>
    <el-dialog :visible.sync="previewMusicDialog" :before-close="clearPreMusic" class="img-dialog" width="56%">
      <div class="poster-wrapper">
        <audio ref="musicAudio" :src="musicBlob" controls autoplay loop="loop" class="img-poster"></audio>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      musicBlob: {
        type: String
      },
      previewMusicDialog: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clearPreMusic() {
        let audio = this.$refs.musicAudio
        if (!audio.paused) {
          audio.pause()
        }
        this.$emit('clearPreMusic')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
