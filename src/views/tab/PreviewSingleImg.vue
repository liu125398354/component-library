<template>
  <div>
    <img class="pic-h-img" :src="path1" @click="previewPoster(path1)"/>
    <img class="pic-v-img" :src="path2" @click="previewPoster(path2)"/>
    <preview-poster
      @clearPrePoster="clearPrePoster"
      :posterPic="posterPic"
      :previewPosterDialog="previewPosterDialog">
    </preview-poster>
  </div>
</template>

<script>
  import PreviewPoster from '@/components/PreviewPoster'
  export default {
    data() {
      return {
        path1: 'https://picsum.photos/699/466?random=1',
        path2: 'https://picsum.photos/300/600?random=2',
        previewPosterDialog: false,
        posterPic: null
      }
    },
    methods: {
      previewPoster(appPosterPath) {
        this.posterPic = appPosterPath
        if (!this.posterPic) {
          this.posterPic = require('@/assets/img/default.png')
        }
        this.previewPosterDialog = true
      },
      clearPrePoster() {
        this.previewPosterDialog = false
        this.posterPic = null
      }
    },
    components: {
      PreviewPoster
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../styles/applist.styl'
  .pic-h-img
    padding: 30px
    width: 100px
    height: 56px
    cursor: pointer
  .pic-v-img
    padding: 30px
    width: 50px
    height: 100px
    cursor: pointer
</style>
