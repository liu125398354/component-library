<template>
  <div class="cal-container">
    <search @search="searchResult" :search="searchTime"></search>
    <div class="a-info-time">自然日：<span>{{ naturalDay }}</span>天<em></em>工作日：<span>{{ workingDay }}</span>天</div>
  </div>
</template>

<script>
  import Search from '@/components/cSearch'
  import { cpttUnifiedDetail } from '@/utils/date'
  export default {
    data() {
      return {
        naturalDay: 0,
        workingDay: 0,
        searchTime: [
          {
            label: '起止日期',
            field: 'time',
            type: 2
          }
        ]
      }
    },
    methods: {
      searchResult(params) {
        console.log('搜索结果--->', params)
        let result = cpttUnifiedDetail(params.startDate, params.endDate)
        this.naturalDay = result.naturalDay
        let promise = Promise.resolve(result.workingDay)
        promise.then(res => {
          this.workingDay = res
        })
      }
    },
    components: {
      Search
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cal-container
    padding: 30px
    .a-info-time
      height: 30px
      line-height: 30px
      padding-right: 12px
      font-weight: 400
      font-size: 14px
      background: #fff
      color: #999
      span
        color: #34A5F9
      em
        margin: 0px 20px
</style>
