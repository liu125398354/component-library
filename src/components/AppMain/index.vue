<template>
  <section class='app-main' style='min-height: 100%'>
    <transition name='fade' mode='out-in'>
      <keep-alive>
        <router-view :key='key'></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    computed: {
      key() {
        console.log('路径--->', this.$route.path)
        return this.$route.path
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
 .app-main
   position: relative
   width: 100%
   margin-top: 70px
   overflow: hidden
</style>
