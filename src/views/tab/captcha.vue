<template>
  <div class="captcha-container">
    <el-row :gutter="10">
      <el-col :span="16">
        <el-input v-model="captcha" placeholder="请输入验证码" name="checkCode" type="text" autocomplete="off" @keyup.enter.native="captchaBtn"/>
      </el-col>
      <el-col :span="8">
        <div class="refresh-code" @click="refreshCpatcha" v-html="svgXml"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid'
  import captchaApi from '@/api/captcha'
  export default {
    data() {
      return {
        captcha: '',
        uuid: '',
        svgXml: '',
      }
    },
    created() {
      this.getCaptchaCode()
    },
    methods: {
      getCaptchaCode() {
        this.uuid = uuidv4()
        captchaApi.getCaptcha({
          sid: this.uuid
        }).then(res => {
          this.svgXml = res.data
        })
      },
      captchaBtn() {
        captchaApi.checkCaptcha({
          sid: this.uuid,
          captcha: this.captcha
        }).then(res => {
          if (res.code === 0) {
            this.$message.closeAll()
            this.$message.success(res.msg)
          } else if (res.code === -1) {
            this.$message.closeAll()
            this.$message.error(res.msg)
          } else if (res.code === -2) {
            this.$message.closeAll()
            this.$message.error(res.msg)
            this.getCaptchaCode()
          }
        })
      },
      refreshCpatcha() {
        this.getCaptchaCode()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .captcha-container
    padding: 30px
    width: 300px
    .refresh-code
      width: 150px
      height: 50px
</style>
