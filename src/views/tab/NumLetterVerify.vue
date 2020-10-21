<template>
  <div class="v-container">
    <el-row :gutter="10">
      <el-col :span="16">
        <el-input v-model="checkCode" placeholder="请输入验证码" name="checkCode" type="text" autocomplete="off" @keyup.enter.native="verifyBtn"/>
      </el-col>
      <el-col :span="8">
        <div class="refresh-code" @click="refreshCode"></div>
        <identify :identifyCode="identifyCode"></identify>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Identify from '@/components/Identify'

  export default {
    data() {
      return {
        identifyCodes: '1234567890ABCDEFGHIGKLMNOPQRSTUVWXYZ',
        identifyCode: '',
        checkCode: ''
      }
    },
    created() {
      this.refreshCode()
    },
    methods: {
      refreshCode() {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
        }
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      verifyBtn() {
        if (this.checkCode === this.identifyCode) {
          this.$message.closeAll()
          this.$message.success('验证码输入正确')
        } else {
          this.$message.closeAll()
          this.$message.error('验证码输入错误')
        }
      }
    },
    components: {
      Identify
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .v-container
    padding: 30px
    width: 300px
    .refresh-code
      position: absolute
      cursor: pointer
      width: 90px
      height: 44px
</style>
