<template>
  <div>
    <live-player :videoUrl="videoUrl" controls></live-player>
  </div>
</template>

<script>
  import LivePlayer from '@liveqing/liveplayer'
  export default {
    components: {
      LivePlayer
    },
    data() {
      return {
        videoUrl: 'http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
