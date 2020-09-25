<template>
  <el-submenu v-if="menu.children && (menu.children.length > 1)" :index="menu.path" :popper-append-to-body="false">
    <template slot="title">{{ menu.meta.title }}</template>
    <div v-for="(submenu, index) in menu.children" :key="index">
      <side-bar-item v-if="submenu.children && (submenu.children.length > 1)" :menu="submenu"></side-bar-item>
      <router-link v-else :to="menu.path + '/' + submenu.path">
        <el-menu-item :index="menu.path + '/' + submenu.path">{{ submenu.meta.title }}</el-menu-item>
      </router-link>
    </div>
  </el-submenu>
  <router-link v-else :to="menu.path + menu.children[0].path">
    <el-menu-item :index="menu.path + menu.children[0].path" :key="index">{{ menu.children[0].meta.title }}</el-menu-item>
  </router-link>
</template>

<script>
  export default {
    name: 'SideBarItem',
    props: {
      menu: {
        type: Object,
        default() {
          return []
        }
      },
      index: {
        type: Number
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
