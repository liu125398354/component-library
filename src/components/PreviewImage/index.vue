<template>
  <div>
    <el-dialog :visible.sync="previewImageDialog"  :before-close="clearPreImg" class="img-dialog" width="56%">
      <el-carousel height="400px" ref="carousel">
        <el-carousel-item v-for="item in picData" :key="item.uid"
                          v-loading="imageLoading"
                          element-loading-text="拼命加载中"
                          element-loading-spinner="el-icon-loading"
                          element-loading-background="rgba(0, 0, 0, 0.8)">
          <img :src="item.pic" style="width: 100%;height: 100%" @load="handleImage"/>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'
  export default {
    props: {
      picIndex: {
        type: Number,
        default: 0
      },
      picData: {
        type: Array,
        default() {
          return []
        }
      },
      previewImageDialog: {
        type: Boolean,
        default: false
      },
      imageLoading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        imageCount: 0
      }
    },
    watch: {
      previewImageDialog: {
        handler: debounce(function() {
          this.$refs.carousel.setActiveItem(this.picIndex)
        }),
        deep: true
      }
    },
    methods: {
      clearPreImg() {
        this.$emit('clearPreImg')
      },
      handleImage() {
        this.imageCount++
        // 清除loading效果，如果为1，关闭，如果为3，则重置为初始值，load里面有几张图片就会走几次
        if (this.imageCount === 1) {
          this.$emit('closeImageLoading')
        }
        if (this.imageCount === 3) {
          this.imageCount = 0
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
