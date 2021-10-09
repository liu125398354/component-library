<template>
  <div>
    <div id="dplayer"></div>
  </div>
</template>

<script>
  import DPlayer from 'dplayer'
  const Hls = require('hls.js')
  export default {
    mounted() {
      const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        screenshot: true,
        autoplay: true,
        video: {
          url: 'http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8',
          type: 'customHls',
          customType: {
            customHls: function (video, player) {
              const hls = new Hls()
              hls.loadSource(video.src)
              hls.attachMedia(video)
            }
          }
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
