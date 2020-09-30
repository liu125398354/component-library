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
          pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601448904247&di=dedbe0c8f803a77803cca490fb44c510&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201503%2F12%2F212714os44yxxupkvuzys4.jpg'
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
  .pic-list
    padding: 30px
    &::after
      content: ''
      display: block
      clear: both
    .pic-item
      position: relative
      float: left
      margin-right: 5px
      width: 100px
      height: 65px
      .pic-img
        width: 100px
        height: 56px
        cursor: pointer
      .pic-mask
        position: absolute
        width: 25px
        height: 25px
        top: 0
        right: 0
        text-align: center
        color: #fff
        font-size: 20px
        background-color: rgba(0,0,0,.5)
        transition: opacity .3s
        .pic-mask-preview
          display: inline-block
          vertical-align: super
          line-height: 1.3
          cursor: pointer
  .pic-img
    width: 100px
    height: 56px
    cursor: pointer
  .img-dialog
    .el-dialog
      &:hover .el-dialog__header .el-dialog__headerbtn
        opacity: 1
      .el-dialog__header
        padding: 0!important
        .el-dialog__headerbtn
          z-index: 100
          opacity: 0
          transition: all .2s linear
          .el-dialog__close
            color: #fff
      .el-dialog__body
        padding: 0!important
      .el-carousel
        position: unset
    .poster-wrapper
      height: 400px
      background-color: #2a2a2a
      .img-poster
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
</style>
