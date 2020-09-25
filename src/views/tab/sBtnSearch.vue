<template>
  <div>
    <div class="container">
      <search @matchAction="matchResult" @search="searchResult" :search="searchParams" :searchbtn="btnParams" ref="search"></search>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Search from '@/components/sSearch'
  const ONE = 0
  const SECOND = 1
  const THIRD = 2
  const FORTH = 3
  export default {
    name: 'Home',
    data() {
      return {
        searchParams: [
          {
            label: '输入框',
            field: 'input',
            type: 0
          },
          {
            label: '下拉框1',
            field: 'selsect1',
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
            label: '下拉框2',
            field: 'select2',
            operations: [{
              value: 1,
              label: '文本5'
            }, {
              value: 0,
              label: '文本6'
            }],
            type: 1
          },
          {
            label: '下拉框3',
            field: 'select3',
            operations: [{
              value: 0,
              label: '文本7'
            }, {
              value: 1,
              label: '文本8'
            }, {
              value: 2,
              label: '文本9'
            }],
            type: 1
          },
          {
            label: '下拉框4',
            field: 'select4',
            operations: [{
              value: 1,
              label: '文本10'
            }, {
              value: 2,
              label: '文本11'
            }],
            type: 1
          }
        ],
        btnParams: [
          {
            label: '按钮1',
            type: 3,
            action: ONE,
            className: 'active-btn common-btn'
          },
          {
            label: '按钮2',
            type: 3,
            action: SECOND,
            className: 'active-btn del-btn'
          },
          {
            label: '按钮3',
            type: 3,
            action: THIRD,
            className: 'active-btn up-btn'
          },
          {
            label: '按钮4',
            type: 3,
            action: FORTH,
            className: 'active-btn down-btn'
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
        } else if (params === THIRD) {
          console.log('按钮3')
        } else if (params === FORTH) {
          console.log('按钮4')
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
