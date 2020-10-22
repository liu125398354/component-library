<template>
  <div class="gv-container">
    <zx-verify
      :w="350"
      :slider-text="text"
      :h="175"
      @success="verifySuccess"
      @fail="verifyFail">
    </zx-verify>
  </div>
</template>

<script>
  import ZxVerify from 'zx-verify'
  import 'zx-verify/dist/zx-verify.css'
  export default {
    data() {
      return {
        text: '向右滑动'
      }
    },
    created() {},
    mounted() {},
    methods: {
      verifySuccess() {
        this.$message.closeAll()
        this.$message.success('校验成功')
      },
      verifyFail() {
        this.$message.closeAll()
        this.$message.error('校验失败')
      }
    },
    components: {
      ZxVerify
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .gv-container
    padding: 30px
</style>