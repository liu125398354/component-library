<template>
  <div class="time-line-container">
    <div class="time-up">
      <span v-show="progress.actualTime !== '～'" class="item-symbol">
        <svg-icon icon-class="right" style="width: 20px;height: 20px;"/>
      </span>
      <div class="time-des">
        <p class="time-title">{{ progress.name }}</p>
        <p class="time-text">{{ progress.label }}</p>
      </div>
    </div>
    <div class="time-line-v"
         :class="{'item-1': index === 0,
         'item-3': index === 2,
         'item-5': index === 4,
         'item-7': index === 6}"></div>
    <div class="time-line-d"
         :class="{'item-1b': index === 0,
         'item-3b': index === 2,
         'item-5b': index === 4,
         'item-7b': index === 6,
         'item-right': pos > 3 && index === pos,
         'item-left': pos > 3 && index === 0}">
      <p>{{ progress.name }}</p>
      <p>预计完成时间：{{ progress.predictTime }}</p>
      <p v-show="progress.actualTime">实际完成时间：{{ progress.actualTime }}</p>
      <p class="time-mark" v-show="progress.mark">备注：{{ progress.mark }}</p>
    </div>
    <div class="time-line-h"
         :class="{'item-1h': index === 0,
         'item-3h': index === 2,
         'item-5h': index === 4,
         'item-7h': index === 6}"></div>
  </div>
</template>

<script>
  export default {
    props: {
      index: {
        type: Number,
        default() {
          return 1
        }
      },
      progress: {
        type: Object,
        default() {
          return {}
        }
      },
      pos: {
        type: Number,
        default() {
          return 1
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .time-line-container
    position: relative
    padding-top: 71px
    &:hover .time-line-d
      display: block
    &:hover .time-line-h:before
      display: block
    &:hover .time-line-h:after
      display: block
    .time-up
      z-index: 1
      position: absolute
      top: -53px
      left: 50%
      transform: translateX(-50%)
      width: 171px
      .item-symbol
        position: absolute
        right: 0
      .time-des
        border: 1px solid #999
        padding: 10px 8px
        font-size: 12px
        background: #fff
        .time-title
          font-weight: 500
          color: #333
          margin-bottom: 8px
        .time-text
          font-weight: 400
          color: #999
    .time-line-v
      position: absolute
      top: 0px
      left: 50%
      transform: translateX(-50%)
      height: 73px
      width: 1.5px
    .time-line-d
      display: none
      position: absolute
      right: 50%
      transform: translateX(50%)
      z-index: 99
      bottom: 22.5px
      width: 240px
      border-radius: 5px
      padding: 10px 8px
      background: #fff
      font-size: 12px
      p
        margin-bottom: 8px
        font-weight: 400
        color: #999
        &:first-child
          font-weight: 500
          color: #333
        &:last-child
          margin-bottom: 0px
      .time-mark
        line-height: 1.2
        word-break: break-all
    .time-line-h
      position: relative
      height: 14px
      &:before
        content: ""
        display: none
        position: absolute
        z-index: 99
        left: 50%
        top: -10px
        transform: translateX(-50%)
        width: 0
        height: 0
        border-right: 10px solid transparent
        border-left: 10px solid transparent
      &:after
        content: ""
        display: none
        position: absolute
        z-index: 99
        left: 50%
        top: -10px
        transform: translateX(-50%)
        width: 0
        height: 0
        border-top: 8px solid #fff
        border-right: 8px solid transparent
        border-left: 8px solid transparent
    .item-1
      background: #4185F3
    .item-3
      background: #406AB2
    .item-5
      background: #3B4A68
    .item-7
      background: #313741
    .item-1b
      border: 1px solid #4185F3
    .item-3b
      border: 1px solid #406AB2
    .item-5b
      border: 1px solid #3B4A68
    .item-7b
      border: 1px solid #313741
    .item-left
      left: 0
      right: unset
      transform: unset
    .item-right
      right: 0
      transform: unset
    .item-1h
      background: #4185F3
      &:before
        border-top: 10px solid #4185F3
    .item-3h
      background: #406AB2
      &:before
        border-top: 10px solid #406AB2
    .item-5h
      background: #3B4A68
      &:before
        border-top: 10px solid #3B4A68
    .item-7h
      background: #313741
      &:before
        border-top: 10px solid #313741
</style>
