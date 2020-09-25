<template>
  <div>
    <div class="container">
      <search @matchAction="matchResult" @submitFile="submitFileResult" @search="searchResult" :limitNumber="limitParams" :fileType="fileParams" :search="searchParams"></search>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Search from '@/components/cSearch'
  const ONE = 0
  const SECOND = 1
  export default {
    name: 'Home',
    data() {
      return {
        limitParams: 3,
        fileParams: 0,
        searchParams: [
          {
            label: '上传',
            type: 4
          },
          {
            label: '按钮1',
            type: 3,
            action: ONE,
            className: 'active-btn diff-btn'
          },
          {
            label: '按钮2',
            type: 3,
            action: SECOND,
            className: 'active-btn del-btn'
          },
          {
            label: '输入框',
            field: 'input',
            type: 0
          },
          {
            label: '下拉框',
            field: 'select',
            operations: [{
              value: 1,
              label: '文本1'
            }, {
              value: 2,
              label: '文本2'
            }, {
              value: 3,
              label: '文本3'
            }, {
              value: 4,
              label: '文本4'
            }],
            type: 1
          },
          {
            label: '起止日期',
            field: 'time',
            type: 2
          }
        ]
      }
    },
    methods: {
      matchResult(params) {
        if (params === ONE) {
          console.log('按钮1')
        } else if (params === SECOND) {
          console.log('按钮2')
        } else {

        }
      },
      searchResult(params) {
        console.log('搜索结果--->', params)
      },
      submitFileResult(params) {
        console.log('上传文件--->', params)
      }
    },
    components: {
      Search
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .container
    padding: 20px
</style>
