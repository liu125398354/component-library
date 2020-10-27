<template>
  <transition name="fade">
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="uploadProcess">
          <el-progress class="progress-left" :text-inside="true" :stroke-width="20" :percentage="progress" :color="colors"></el-progress>
          <el-tooltip class="tip-text" content="继续上传" effect="light" placement="right" v-if="isShow">
            <span @click="startUpload" class="svg-span">
            <svg-icon icon-class="start" style="width: 25px;height: 25px;cursor: pointer"></svg-icon>
          </span>
          </el-tooltip>
          <el-tooltip class="tip-text" content="暂停上传" effect="light" placement="right" v-if="progress > 0 && progress < 100 && !isShow">
            <span @click="stopUpload" class="svg-span">
              <svg-icon icon-class="stop" style="width: 25px;height: 25px;cursor: pointer"></svg-icon>
            </span>
          </el-tooltip>
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
      isShow: {
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
    },
    methods: {
      startUpload() {
        this.$emit('start')
      },
      stopUpload() {
        this.$emit('stop')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-tooltip__popper
    z-index: 10000 !important
  .fade-enter-active,.fade-leave-active
    transition: all 0.5s
  .fade-enter-active
    opacity: 1
  .fade-enter,.fade-leave-active
    opacity: 0
  .detail
    position: fixed
    z-index: 999
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
        width: 70%
        text-align: center
        position: absolute
        left: 50%
        top: 50%
        transform: translateX(-50%)
        margin-top: -60px
        .el-progress__text
          font-size: 20px !important;
          color: #3c6;
        .progress-left
          float: left
          width: 92%
          .svg-span
            float: right
        &:after
          content: ''
          display: block
          clear: both
</style>
