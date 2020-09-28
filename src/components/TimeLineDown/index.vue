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
      <!--<div class="time-split"></div>-->
    </div>
    <div class="time-line-v"
         :class="{'item-2': index === 1,
         'item-4': index === 3,
         'item-6': index === 5}">
    </div>
    <div class="time-line-d"
         :class="{'item-2b': index === 1,
         'item-4b': index === 3,
         'item-6b': index === 5,
         'item-right': pos > 3 && index === pos}">
      <p>{{ progress.name }}</p>
      <p>预计完成时间：{{ progress.predictTime }}</p>
      <p v-show="progress.actualTime">实际完成时间：{{ progress.actualTime }}</p>
      <p class="time-mark" v-show="progress.mark">备注：{{ progress.mark }}</p>
    </div>
    <div class="time-line-h"
         :class="{'item-2h': index === 1,
         'item-4h': index === 3,
         'item-6h': index === 5}">
    </div>
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
    margin-top: 71px
    &:hover .time-line-d
      display: block
    &:hover .time-line-h:before
      display: block
    &:hover .time-line-h:after
      display: block
    .time-line-v
      position: absolute
      top: 9px
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
    .time-up
      z-index: 1
      position: absolute
      top: 72px
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
    .item-2
      background: #427CDD
    .item-4
      background: #3E5A8E
    .item-6
      background: #363C46
    .item-2b
      border: 1px solid #427CDD
    .item-4b
      border: 1px solid #3E5A8E
    .item-6b
      border: 1px solid #363C46
    .item-right
      right: 0
      transform: unset
    .item-2h
      background: #427CDD
      &:before
        border-top: 10px solid #427CDD
    .item-4h
      background: #3E5A8E
      &:before
        border-top: 10px solid #3E5A8E
    .item-6h
      background: #363C46
      &:before
        border-top: 10px solid #363C46
</style>
