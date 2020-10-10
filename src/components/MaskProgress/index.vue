<template>
  <transition name="fade">
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="uploadProcess">
          <el-progress type="circle" :percentage="progress" :color="colors"></el-progress>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      detailShow: {
        type: Boolean
      },
      progress: {
        type: Number
      }
    },
    data() {
      return {
        colors: [
          { color: '#f56c6c', percentage: 20 },
          { color: '#e6a23c', percentage: 40 },
          { color: '#6f7ad3', percentage: 60 },
          { color: '#1989fa', percentage: 80 },
          { color: '#67c23a', percentage: 100 }
        ]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .fade-enter-active,.fade-leave-active
    transition: all 0.5s
  .fade-enter-active
    opacity: 1
  .fade-enter,.fade-leave-active
    opacity: 0
  .detail
    position: fixed
    z-index: 9999
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    background: rgba(7,17,27,0.8)
    backdrop-filter: blur(10px)
    .detail-wrapper
      width: 100%
      min-height: 100%
      .uploadProcess
        width: 100%
        text-align: center
        position: absolute
        top: 50%
        margin-top: -60px
        .el-progress__text
          font-size: 20px !important;
          color: #3c6;
</style>
