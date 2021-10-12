<template>
  <div>
    <recording :recordType="recordType"></recording>
  </div>
</template>

<script>
  import Recording from '@/components/Recording'
  export default {
    data() {
      return {
        recordType: 'screen'
      }
    },
    components: {
      Recording
    },
    destroyed() {
      console.log('销毁captivate')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
