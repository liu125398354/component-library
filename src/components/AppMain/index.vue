<template>
  <section class='app-main' style='min-height: 100%'>
    <transition name='fade' mode='out-in'>
      <keep-alive :include='cachedRoutes'>
        <router-view :key='key'></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        visitedRoutes: 'page/visitedRoutes'
      }),
      cachedRoutes() {
        console.log('bbbbbb')
        const cachedRoutesArr = []
        console.log(this.visitedRoutes)
        this.visitedRoutes.forEach((item) => {
          // if (!item.meta.noKeepAlive) {
          //   cachedRoutesArr.push(item.name);
          //   this.handleSkeleton();
          // }
          console.log('aaa', item)
        })
        return cachedRoutesArr
      },
      key() {
        console.log('444444444444', this.$route.path)
        return this.$route.path
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
 .app-main
   position: relative
   width: 100%
   overflow: hidden
</style>
