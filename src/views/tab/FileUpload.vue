<template>
  <div class="file">
    <el-upload
      ref="upload"
      multiple
      :limit="5"
      class="avatar-uploader"
      action="https://192.168.6.17:3000/uploadImg/"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :http-request="uploadRequest">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button class="submit-btn" type="primary" @click="submitBtn">上传按钮</el-button>
    <mask-progress :detailShow="detailShow" :progress="progress"></mask-progress>
  </div>
</template>

<script>
  import axios from 'axios'
  import MaskProgress from '@/components/MaskProgress'
  export default {
    data() {
      return {
        detailShow: false,
        count: 0,
        progress: 0,
        fileList: []
      }
    },
    methods: {
      handleChange(file, fileList) {
        console.log(file.raw)
        this.fileList.push({
          uid: file.uid,
          file: file.raw
        })
      },
      handleRemove(file) {
        let index = this.fileList.findIndex(item => {
          return item.uid === file.uid
        })
        if (index !== -1) {
          this.fileList.splice(index, 1)
        }
      },
      handleExceed(files, fileList) {
        this.$message.warning('最多只能上传 5 个文件')
      },
      uploadRequest(params) {
        this.count++
        // console.log('数量--->', this.count)
        if (this.count === this.fileList.length) {
          // console.log('进入文件')
          let form = new FormData()
          for (let i = 0; i < this.fileList.length; i++) {
            form.append('file', this.fileList[i].file)
          }
          this.finalUpload(form)
        }
      },
      finalUpload(form) {
        this.detailShow = true
        let config = {
          onUploadProgress: progressEvent => {
            let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
            this.progress = complete
          }
        }

        // 调用本地接口

        axios.post('/api/apk/upload', form, config).then(res => {
          setTimeout(() => {
            this.detailShow = false
          }, 800)
          setTimeout(() => {
            this.$confirm('文件上传成功！', '温馨提示', {
              confirmButtonText: '查看文件',
              cancelButtonText: '继续上传'
            }).then(() => {
              this.$message.success('跳转到文件页面')
              this.progress = 0
              this.count = 0
              this.fileList = []
              this.$refs.upload.clearFiles()
            }).catch(() => {
              this.progress = 0
              this.count = 0
              this.fileList = []
              this.$refs.upload.clearFiles()
            })
          }, 1500)
        })
      },
      submitBtn() {
        if (this.fileList.length > 0) {
          this.$refs.upload.submit()
        } else {
          this.$message.closeAll()
          this.$message({
            message: '你还没有上传文件',
            type: 'warning'
          })
        }
      }
    },
    components: {
      MaskProgress
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .file
    padding: 30px
    .avatar-uploader .el-upload
      border: 1px dashed #d9d9d9
      border-radius: 6px
      cursor: pointer
      position: relative
      overflow: hidden
      &:hover
        border-color: #409EFF
      .avatar-uploader-icon
        font-size: 28px
        color: #8c939d
        width: 150px
        height: 120px
        line-height: 120px
        text-align: center
    .submit-btn
      margin-top: 15px
</style>
