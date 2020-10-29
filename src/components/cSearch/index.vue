<template>
  <div>
    <ul class="search-list">
      <li v-for="(info,index) in search" class="search-item" :class="{'date-time':info.type === 2, 'all-btn': info.type === 3, 'upload-btn': info.type === 4 }" :key="index">
        <el-row v-if="info.type === 0">
          <el-col :span="6"><div class="search-position"><span class="search-label">{{info.label}}:</span></div></el-col>
          <el-col :span="18"><div><el-input class="search-input" maxlength="60" v-model="fileSearch[info.field]"  :placeholder="tip(info.label)" clearable></el-input></div></el-col>
        </el-row>
        <el-row v-if="info.type === 1">
          <el-col :span="6"><div class="search-position"><span class="search-label">{{info.label}}:</span></div></el-col>
          <el-col :span="18">
            <div>
              <el-select class="search-select" v-model="fileSearch[info.field]" clearable placeholder="请选择">
              <el-option
                v-for="item in info.operations"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="info.type === 2">
          <el-col :span="4"><div class="search-position"><span class="search-label">{{info.label}}:</span></div></el-col>
          <el-col :span="20">
            <div>
              <el-date-picker
                v-model="value"
                type="daterange"
                @change="change"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <div v-if="info.type === 3"><span :class="info.className" @click="diffBtn(info.action)">{{info.label}}</span></div>
        <div v-if="info.type === 4">
          <span class="active-btn common-btn" @click="chooseFile">{{ info.label }}
              <input ref="uploadFile" class="upload-file" type="file" multiple @change="fileChange"/>
            </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'
  export default {
    props: {
      search: {
        type: Array,
        default() {
          return []
        }
      },
      limitNumber: {
        type: Number,
        default() {
          return 5
        }
      },
      fileType: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    data() {
      return {
        flag: true,
        fileList: [],
        fileSearch: {},
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value: ''
      }
    },
    watch: {
      fileSearch: {
        handler: debounce(function() {
          // 返回数据给父组件
          // console.log('handle----->', this.fileSearch)
          this.$emit('search', this.fileSearch)
        }, 500),
        // 对象内部的属性监听,即深度监听
        deep: true
      }
    },
    methods: {
      tip(label) {
        return '请输入' + label
      },
      clear() {
        this.fileSearch = {}
      },
      change() {
        if (!this.value) {
          this.fileSearch.startDate = ''
          this.fileSearch.endDate = ''
        } else {
          this.fileSearch.startDate = this.value[0]
          this.fileSearch.endDate = this.value[1]
        }
        this.$emit('search', this.fileSearch)
      },
      diffBtn(params) {
        this.$emit('matchAction', params)
      },
      chooseFile() {
        this.$refs.uploadFile[0].click()
      },
      limitFileSize(arr) {
        let count = 0
        for (let i = 0; i < arr.length; i++) {
          count = count + arr[i].size
        }
        let resultCount = count / 1024 / 1024
        if (resultCount < 500) {
          return true
        } else {
          return false
        }
      },
      fileChange() {
        // console.log(this.$refs.uploadFile)
        if (this.$refs.uploadFile[0].files.length > this.limitNumber) {
          this.$message.warning(`当前限制选择${this.limitNumber}个文件，本次选择了${this.$refs.uploadFile[0].files.length}个文件`)
        } else {
          console.log(this.$refs.uploadFile[0].files)
          let arr = Array.from(this.$refs.uploadFile[0].files)
          if (this.fileType === 0) {
            let index = arr.findIndex(item => {
              return !(/mp3$/.test(item.name))
            })
            if (index === -1) {
              if (this.limitFileSize(arr)) {
                this.$emit('submitFile', arr)
              } else {
                this.$message.closeAll()
                this.$message({
                  message: '文件总大小不能超过500M',
                  type: 'warning'
                })
              }
            } else {
              this.$message.closeAll()
              this.$message({
                message: '请上传 mp3 格式的文件',
                type: 'warning'
              })
            }
          } else if (this.fileType === 1) {
            let index = arr.findIndex(item => {
              return !(/mp4$/.test(item.name)) && !(/bmp$/.test(item.name)) && !(/png$/.test(item.name)) &&
                !(/jpg$/.test(item.name)) && !(/gif$/.test(item.name))
            })
            if (index === -1) {
              if (this.limitFileSize(arr)) {
                this.$emit('submitFile', arr)
              } else {
                this.$message.closeAll()
                this.$message({
                  message: '文件总大小不能超过500M',
                  type: 'warning'
                })
              }
            } else {
              this.$message.closeAll()
              this.$message({
                message: '请上传 bmp、jpg、png、gif、mp4 格式的文件',
                type: 'warning'
              })
            }
          } else {
            let index = arr.findIndex(item => {
              return !(/pdf$/.test(item.name)) && !(/doc$/.test(item.name)) && !(/docx$/.test(item.name)) &&
                !(/xls$/.test(item.name)) && !(/xlsx$/.test(item.name)) && !(/ppt$/.test(item.name)) &&
                !(/pptx$/.test(item.name))
            })
            if (index === -1) {
              if (this.limitFileSize(arr)) {
                this.$emit('submitFile', arr)
              } else {
                this.$message.closeAll()
                this.$message({
                  message: '文件总大小不能超过500M',
                  type: 'warning'
                })
              }
            } else {
              this.$message.closeAll()
              this.$message({
                message: '请上传文档类格式的文件',
                type: 'warning'
              })
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .search-list
    list-style: none
    &:after
      content: ''
      display: block
      clear: both
    .search-item
      float: left
      width: 290px
      margin-bottom: 14px
      &.date-time
        width: 435px
      &.all-btn
        width: 120px
      &.upload-btn
        width: 120px
      .search-position
        height: 36px
        line-height: 36px
        .search-label
          margin-right: 5px
          font-size: 14px
          font-weight: 200
          color: #353535
      .search-select
        margin-right: 30px
        width: 200px
      .search-input
        width: 200px
      .active-btn
        display: inline-block
        cursor: pointer
        border-radius: 3px
        width: 100px
        line-height: 2.5
        text-align: center
        font-size: 14px
        font-weight: 200
        .upload-file
          display: none
      .diff-btn
        background: #ecf5ff
        border: 1px solid #409eff
        color: #34A5F9
        &:hover
          border: 1px solid transparent
      .common-btn
        position: relative
        color: #fff
        background: #409eff
        .upload-btn
          z-index: 1
          position: absolute
          top: 0
          left: 0
          opacity: 0
          .el-button--small
            padding: 9px 25px
        &:hover
          color: #0099ff
          background: #e6f5ff
      .del-btn
        color: #F56C6C
        background: #fef0f0
        border: 1px solid #f56c6c
        &:hover
          border: 1px solid transparent
      .up-btn
        color: #008000
        background: #f1f9eb
        border: 1px solid #008000
        &:hover
          border: 1px solid transparent
      .down-btn
        color: #ff6600
        background: #fef6ed
        border: 1px solid #ff6600
        &:hover
          border: 1px solid transparent
</style>
