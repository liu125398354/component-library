<template>
  <div class="d-time-container">
    <ul class="d-time-line">
      <li class="d-time-item" v-for="(item, index) in progressData" :key="index">
        <time-line-up v-if="index % 2 === 0" :index="index" :progress="item" :pos="progressData.length - 1"></time-line-up>
        <time-line-down v-else :index="index" :progress="item" :pos="progressData.length - 1"></time-line-down>
      </li>
    </ul>
  </div>
</template>

<script>
  import TimeLineUp from '@/components/TimeLineUp'
  import TimeLineDown from '@/components/TimeLineDown'
  export default {
    data() {
      return {
        progressData: [
          {
            name: '进度一',
            label: '2020-01-13～2020-01-17',
            predictTime: '2020-01-13～2020-01-17',
            actualTime: '2020-01-13～2020-01-17',
            mark: '这是备注内容'
          },
          {
            name: '进度二',
            label: '2020-01-20～2020-01-22',
            predictTime: '2020-01-20～2020-01-22',
            actualTime: '2020-01-20～2020-01-22',
            mark: '这是备注内容'
          },
          {
            name: '进度三',
            label: '2020-08-17～2020-08-25',
            predictTime: '2020-08-17～2020-08-25',
            actualTime: '2020-08-14～2020-08-20'
          },
          {
            name: '进度四',
            label: '2020-04-15～2020-08-14',
            predictTime: '2020-04-15～2020-08-14',
            actualTime: '2020-04-15～2020-08-13'
          },
          {
            name: '进度五',
            label: '2020-04-15～2020-08-14',
            predictTime: '2020-04-15～2020-08-14',
            actualTime: '2020-04-15～2020-08-14',
            mark: '这是备注内容'
          },
          {
            name: '进度六',
            label: '2020-08-17～2020-08-28',
            predictTime: '2020-08-17～2020-08-28',
            actualTime: '2020-08-14～2020-08-26',
            mark: '这是备注内容'
          },
          {
            name: '进度七',
            label: '2020-08-31～2020-08-31',
            predictTime: '2020-08-31～2020-08-31'
          }
        ]
      }
    },
    components: {
      TimeLineUp,
      TimeLineDown
    }
  }
</script>

<style lang="stylus">
  .d-time-container
    padding: 78px 40px
    margin: 25px 0
    background: #f7f7f7
    .d-time-line
      display: flex
      list-style: none
      height: 144px
      .d-time-item
        flex: 1
        margin-right: 3px
</style>
