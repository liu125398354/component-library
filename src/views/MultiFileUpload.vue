<template>
  <div class="max-container">
    <el-upload
            ref="upload"
            class="avatar-uploader"
            multiple
            :limit="10"
            :on-change="handleChange"
            :on-exceed="handleExceed"
            action="https://192.168.6.17:3000/uploadImg/"
            :auto-upload="false"
            :http-request="uploadRequest">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button class="submit-btn" type="primary" @click="submit">上 传</el-button>

    <el-popover
      placement="left"
      width="400"
      trigger="click">
      <ul class="list">
        <li class="list-item" v-for="(item, index) in fileDataObj" :key="index">
          <div class="first">
            <div class="name">{{ item.name }}</div>
            <div>
              <el-tooltip class="tip-text" content="继续上传" effect="light" placement="right" v-if="item.svgShow">
              <span @click="startChunk(item)" class="svg-span">
                <svg-icon icon-class="start" style="width: 25px;height: 25px;cursor: pointer"></svg-icon>
              </span>
              </el-tooltip>
              <el-tooltip class="tip-text" content="暂停上传" effect="light" placement="right" v-if="item.progress > 0 && item.progress < 100 && !item.svgShow">
              <span @click="stopChunk(item)" class="svg-span">
                <svg-icon icon-class="stop" style="width: 25px;height: 25px;cursor: pointer"></svg-icon>
              </span>
              </el-tooltip>
            </div>
          </div>
          <div class="second">
            <div>{{ item.index === item.shardCount ? (item.file.size / 1024 / 1024).toFixed(2) : item.index * 2 }}MB/{{ (item.file.size / 1024 / 1024).toFixed(2) }}MB</div>
            <div>{{ item.uploadSpeed }}</div>
          </div>
          <el-progress class="progress-left" :text-inside="true" :stroke-width="20" :percentage="item.progress" :color="colors"></el-progress>
        </li>
      </ul>
      <el-button class="btn-float" slot="reference">查看</el-button>
    </el-popover>
  </div>
</template>

<script>
  import fileApi from '@/api/file'
  import { handleMaxFile } from '@/utils/md5'
  import { loadFromLocal, saveToLocal, removeLocal } from '@/utils/store'
  export default {
    data() {
      return {
        fileDataObj: [],
        analyzeLoading: '',
        onLine: navigator.onLine,
        colors: [
          { color: '#f56c6c', percentage: 20 },
          { color: '#e6a23c', percentage: 40 },
          { color: '#6f7ad3', percentage: 60 },
          { color: '#1989fa', percentage: 80 },
          { color: '#67c23a', percentage: 100 }
        ]
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
        this.fileDataObj.push({
          name: file.name,
          index: 0,
          file: fileRaw,
          cancel: false,
          svgShow: false
        })
        let self = this
        handleMaxFile(fileRaw).then(function(result) {
          // 处理 result
          self.analyzeLoading.close()
          let index = self.fileDataObj.findIndex(item => item.name === fileRaw.name)
          self.fileDataObj[index].md5 = result
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
        // this.count++
        // if (this.count === Object.keys(this.fileDataObj).length) {
        //   console.log('jinru')
        // }
        // return
        // if (params.file.size / 1024 / 1024 < 100) {
        //   this.$message.closeAll()
        //   this.$message.warning('请上传大于100M的文件')
        //   return
        // }
        // this.detailShow = true
        // 此时查看有没有分片，如果有则继续上次分片上传，如果没有则是最新选择文件上传
        let index = this.fileDataObj.findIndex(item => item.name === params.file.name)
        this.fileDataObj[index].startTime = new Date().getTime()
        if (loadFromLocal(params.file.name, 'index')) {
          this.fileDataObj[index].index = loadFromLocal(params.file.name, 'index')
          this.uploadChunk(params.file, loadFromLocal(params.file.name, 'index'))
        } else {
          console.log('当前时间--', new Date())
          this.uploadChunk(params.file, 0)
        }
      },
      uploadChunk(fileObj, item) {
        let index = this.fileDataObj.findIndex(item => item.name === fileObj.name)
        if (this.fileDataObj[index].cancel || !this.onLine) {
          return
        }
        let chunkSize = 1024 * 1024
        if (fileObj.size > 1024 * 1024 * 100) {
          chunkSize = chunkSize * 2
        }
        console.log('上传文件---', fileObj)
        this.fileDataObj[index].shardCount = Math.ceil(fileObj.size / chunkSize)
        let start = this.fileDataObj[index].index * chunkSize
        if (start >= fileObj.size) {
          return
        }
        let end = Math.min(fileObj.size, start + chunkSize) // 结束下标
        let form = new FormData()
        form.append('file', fileObj.slice(start, end)) // 上传分片文件大小
        form.append('name', this.fileDataObj[index].name) // 文件名称
        form.append('md5', this.fileDataObj[index].md5) // 文件md5值
        form.append('total', this.fileDataObj[index].shardCount) // 总片数
        form.append('index', this.fileDataObj[index].index + 1) // 当前片数
        // if ((item + 1) === this.fileDataObj[fileObj.name].shardCount) {
        //   let source = { ufMd5: this.uploadMD5 }
        //   form.append('info', JSON.stringify(source))
        // }
        console.log('开始')
        fileApi.uploadMultiChunk(form).then(res => {
          console.log('后台返回参数--->', res, res.index)
          /**
           * 上传文件请求回调函数中的idx不再使用item+1，而是应用后台返回来的index(使保存到本地的index和实际上传的分片
           一一对应)，请求时间不能设置超时(因为不清楚网络状况)，当idx小于等于loadFromLocal(fileObj.name, 'index')时，
           直接返回，终止下次递归上传的操作，保证始终只有一个请求，不会因为网络断开再重新连接，出现一段时间等待导致
           回调函数走了两次的问题----->致使存储到本地的index出现错乱
           */
          this.$forceUpdate()
          let tempIndex = this.fileDataObj.findIndex(item => item.name === res.name)
          this.fileDataObj[tempIndex].uploadSpeed = ((parseInt(res.index) * 2) / ((new Date().getTime() - this.fileDataObj[tempIndex].startTime) / 1000)).toFixed(2) + 'MB/s'
          let idx = parseInt(res.index)
          console.log('请求回调后的idx----->', idx, ' ---- >>', res.name, loadFromLocal(this.fileDataObj[tempIndex].name, 'index'))
          if (idx <= loadFromLocal(this.fileDataObj[tempIndex].name, 'index')) {
            return
          }
          saveToLocal(this.fileDataObj[tempIndex].name, 'index', idx)
          this.fileDataObj[tempIndex].index = idx
          this.fileDataObj[tempIndex].progress = Math.round((idx) / this.fileDataObj[tempIndex].shardCount * 100)
          if (idx === this.fileDataObj[tempIndex].shardCount) {
            console.log('结束时间---', new Date().getTime())
            // index当前的片数，如果满了就要清除掉，succeed初始值为0，每成功一次+1，成功后也要删除
            // removeLocal(fileObj.name, 'succeed')
            /**
             * 一开始根据this.progress是否为100%去判断,但是它应用Math.round去取整，所以会出现重复的时候，即使加入了
             * setTimeout延时也会由于文件大小不同，写入合并时间就会有长短，所以无法具体判断，就会发生错误,
             * 所以还是根据当前上传片数和总片数的多少来判断，最为靠谱
             */
            removeLocal(this.fileDataObj[tempIndex].name, 'index')
            // this.$refs.upload.clearFiles()
            // setTimeout(() => {
            //   this.detailShow = false
            //   this.$message({
            //     message: '上传成功',
            //     type: 'success'
            //   })
            // }, 800)
            // let self = this
            // setTimeout(() => {
            //   self.progress = 0
            // }, 1500)
          }
          this.uploadChunk(this.fileDataObj[tempIndex].file, idx)
        })
      },
      startChunk(file) {
        if (this.onLine) {
          let index = this.fileDataObj.findIndex(item => item.name === file.name)
          this.fileDataObj[index].svgShow = false
          this.fileDataObj[index].cancel = false
          // console.log('暂停后开始的index------->', loadFromLocal(this.fileObj.name, 'index'))
          this.uploadChunk(this.fileDataObj[index].file, loadFromLocal(this.fileDataObj[index].name, 'index'))
        } else {
          this.$message.closeAll()
          this.$message({
            message: '您还没有连接网络',
            type: 'error'
          })
        }
      },
      stopChunk(file) {
        let index = this.fileDataObj.findIndex(item => item.name === file.name)
        this.fileDataObj[index].svgShow = true
        this.fileDataObj[index].cancel = true
      },

      updateOnlineStatus(e) {
        this.onLine = e.type === 'online'
        if (this.onLine) {
          this.$message.closeAll()
          this.$message({
            message: '网络已连接！',
            type: 'success'
          })
          this.fileDataObj.forEach(item => {
            item.svgShow = false
            item.cancel = false
            if (loadFromLocal(item.name, 'index') !== undefined) {
              this.uploadChunk(item.file, loadFromLocal(item.name, 'index'))
            }
          })
        } else {
          this.$message.closeAll()
          this.$message({
            message: '网络已断开！',
            type: 'error'
          })
          this.fileDataObj.forEach(item => {
            item.svgShow = true
            item.cancel = true
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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  ::-webkit-scrollbar
    width: 6px
  ::-webkit-scrollbar-thumb
    background: #dddee0
    border-radius: 5px
  ::-webkit-scrollbar-track
    display: none
  .list
    width: 400px
    height: 400px
    overflow-y: scroll
    padding-right: 10px
    .list-item
      margin: 10px 0
    .first
      display: flex
      justify-content space-between
      .name
        width 300px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
    .second
      display: flex
      justify-content space-between
      margin: 3px 0
      font-size: 12px
      color: #666
  .btn-float
    position: fixed
    right: 5px
    bottom: 200px
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
