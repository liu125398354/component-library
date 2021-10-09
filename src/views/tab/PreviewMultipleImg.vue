<template>
  <div>
    <ul class="pic-list">
      <li class="pic-item" v-for="(item,index) in imgData" :key="index">
        <img class="pic-img" :src="item.pic" @click="previewPic(index, imgData)"/>
      </li>
    </ul>
    <preview-image
      @closeImageLoading="closeImageLoading"
      @clearPreImg="clearPreImg"
      :picData="picData"
      :picIndex="picIndex"
      :previewImageDialog="previewImageDialog"
      :imageLoading="imageLoading">
    </preview-image>
  </div>
</template>

<script>
  import PreviewImage from '@/components/PreviewImage'
  export default {
    data() {
      return {
        imgData: [{
          uid: 0,
          pic: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          uid: 1,
          pic: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
        },
        {
          uid: 2,
          pic: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          uid: 3,
          pic: 'https://picsum.photos/1080/720?random=1'
        }],
        imageLoading: false,
        previewImageDialog: false,
        picData: [],
        picIndex: 0
      }
    },
    methods: {
      closeImageLoading() {
        this.imageLoading = false
      },
      clearPreImg() {
        this.previewImageDialog = false
        this.picData = []
      },
      previewPic(index, pic) {
        document.onkeydown = function(event) {
          if (event.keyCode === 13) {
            return false
          }
        }
        this.previewImageDialog = true
        this.imageLoading = true
        this.picData = pic
        this.picIndex = index
      }
    },
    components: {
      PreviewImage
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../styles/applist.styl'
</style>
