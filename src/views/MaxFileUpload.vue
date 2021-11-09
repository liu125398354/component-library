<template>
  <div class="max-container">
    <el-upload
            ref="upload"
            class="avatar-uploader"
            :limit="1"
            :on-change="handleChange"
            :on-exceed="handleExceed"
            action="https://192.168.6.17:3000/uploadImg/"
            :auto-upload="false"
            :http-request="uploadRequest">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button class="submit-btn" type="primary" @click="submit">上 传</el-button>
    <chunk-progress :detailShow="detailShow" :isShow="svgShow" :progress="progress" @start="startChunk" @stop="stopChunk"></chunk-progress>
  </div>
</template>

<script>
  import fileApi from '@/api/file'
  import ChunkProgress from '@/components/ChunkProgress'
  import { handleMaxFile } from '@/utils/md5'
  import { loadFromLocal, saveToLocal, removeLocal } from '@/utils/store'
  export default {
    data() {
      return {
        analyzeLoading: '',
        uploadMD5: null,
        cancel: false,
        onLine: navigator.onLine,
        progress: 0,
        fileObj: {},
        detailShow: false,
        svgShow: false
      }
    },
    mounted() {
      window.addEventListener('online', this.updateOnlineStatus)
      window.addEventListener('offline', this.updateOnlineStatus)
    },
    beforeDestroy() {
      window.removeEventListener('online', this.updateOnlineStatus)
      window.removeEventListener('offline', this.updateOnlineStatus)
    },
    methods: {
      handleExceed(files, fileList) {
        this.$message.warning(`只能上传 ${fileList.length} 个文件`)
      },
      handleChange(file, fileList) {
        let fileRaw = file.raw
        this.analyzeProgress()
        let self = this
        handleMaxFile(fileRaw).then(function(result) {
          // 处理 result
          self.analyzeLoading.close()
          self.uploadMD5 = result
        })
      },

      analyzeProgress() {
        this.analyzeLoading = this.$loading({
          lock: true,
          text: '生成MD5中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      },
      uploadRequest(params) {
        if (params.file.size / 1024 / 1024 < 100) {
          this.$message.closeAll()
          this.$message.warning('请上传大于100M的文件')
          return
        }
        this.fileObj = params.file
        this.detailShow = true
        // 此时查看有没有分片，如果有则继续上次分片上传，如果没有则是最新选择文件上传
        if (loadFromLocal(this.fileObj.name, 'index')) {
          this.uploadChunk(this.fileObj, loadFromLocal(this.fileObj.name, 'index'))
        } else {
          this.uploadChunk(this.fileObj, 0)
        }
      },
      uploadChunk(fileObj, item) {
        if (this.cancel || !this.onLine) {
          return
        }
        let chunkSize = 1024 * 1024
        if (fileObj.size > 1024 * 1024 * 100) {
          chunkSize = chunkSize * 2
        }

        let shardCount = Math.ceil(fileObj.size / chunkSize)
        let start = item * chunkSize
        if (start >= fileObj.size) {
          return
        }
        let end = Math.min(fileObj.size, start + chunkSize) // 结束下标
        let form = new FormData()
        form.append('file', fileObj.slice(start, end)) // 上传分片文件大小
        form.append('name', fileObj.name) // 文件名称
        form.append('md5', this.uploadMD5) // 文件md5值
        form.append('total', shardCount) // 总片数
        form.append('index', item + 1) // 当前片数
        if ((item + 1) === shardCount) {
          let source = { ufMd5: this.uploadMD5 }
          form.append('info', JSON.stringify(source))
        }
        fileApi.uploadMaxFile(form).then(res => {
          console.log('后台返回参数--->', res.index)
          /**
           * 上传文件请求回调函数中的idx不再使用item+1，而是应用后台返回来的index(使保存到本地的index和实际上传的分片
           一一对应)，请求时间不能设置超时(因为不清楚网络状况)，当idx小于等于loadFromLocal(fileObj.name, 'index')时，
           直接返回，终止下次递归上传的操作，保证始终只有一个请求，不会因为网络断开再重新连接，出现一段时间等待导致
           回调函数走了两次的问题----->致使存储到本地的index出现错乱
           */

          let idx = parseInt(res.index)
          console.log('请求回调后的idx----->', idx, ' ---- ', loadFromLocal(fileObj.name, 'index'))
          if (idx <= loadFromLocal(fileObj.name, 'index')) {
            return
          }
          saveToLocal(fileObj.name, 'index', idx)
          this.progress = Math.round((idx) / shardCount * 100)
          if (idx === shardCount) {
            // index当前的片数，如果满了就要清除掉，succeed初始值为0，每成功一次+1，成功后也要删除
            // removeLocal(fileObj.name, 'succeed')
            /**
             * 一开始根据this.progress是否为100%去判断,但是它应用Math.round去取整，所以会出现重复的时候，即使加入了
             * setTimeout延时也会由于文件大小不同，写入合并时间就会有长短，所以无法具体判断，就会发生错误,
             * 所以还是根据当前上传片数和总片数的多少来判断，最为靠谱
             */
            removeLocal(fileObj.name, 'index')
            this.$refs.upload.clearFiles()
            setTimeout(() => {
              this.detailShow = false
              this.$message({
                message: '上传成功',
                type: 'success'
              })
            }, 800)
            let self = this
            setTimeout(() => {
              self.progress = 0
            }, 1500)
          }
          this.uploadChunk(fileObj, idx)
        })
      },
      startChunk() {
        if (this.onLine) {
          this.svgShow = false
          this.cancel = false
          // console.log('暂停后开始的index------->', loadFromLocal(this.fileObj.name, 'index'))
          this.uploadChunk(this.fileObj, loadFromLocal(this.fileObj.name, 'index'))
        } else {
          this.$message.closeAll()
          this.$message({
            message: '您还没有连接网络',
            type: 'error'
          })
        }
      },
      stopChunk() {
        this.svgShow = true
        this.cancel = true
      },

      updateOnlineStatus(e) {
        this.onLine = e.type === 'online'
        if (this.onLine) {
          this.svgShow = false
          this.cancel = false
          this.$message.closeAll()
          this.$message({
            message: '网络已连接！',
            type: 'success'
          })
          if (loadFromLocal(this.fileObj.name, 'index') === undefined) {
            return
          }
          this.uploadChunk(this.fileObj, loadFromLocal(this.fileObj.name, 'index'))
        } else {
          this.svgShow = true
          this.cancel = true
          this.$message.closeAll()
          this.$message({
            message: '网络已断开！',
            type: 'error'
          })
        }
      },
      submit() {
        let list = document.getElementsByClassName('el-upload-list__item is-ready')
        if (list.length > 0) {
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
      ChunkProgress
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .max-container
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
