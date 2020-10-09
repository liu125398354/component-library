<template>
  <div>
    <el-dialog :visible.sync="previewPosterDialog" :before-close="clearPrePoster" class="img-dialog" width="56%">
      <div class="poster-wrapper">
        <img :src="posterPic" class="img-poster"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      posterPic: {
        type: String
      },
      previewPosterDialog: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clearPrePoster() {
        this.$emit('clearPrePoster')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
