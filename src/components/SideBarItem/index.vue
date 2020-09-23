<template>
  <el-submenu v-if="menu.children && menu.children.length" :index="menu.path" :popper-append-to-body="false">
    <template slot="title">{{ menu.title }}</template>
    <div v-for="(submenu, index) in menu.children" :key="index">
      <el-menu-item :index="submenu.path">{{ submenu.title }}</el-menu-item>
      <side-bar-item v-if="submenu.children && submenu.children.length" :menu="submenu"></side-bar-item>
    </div>
  </el-submenu>
  <el-menu-item v-else :index="menu.path" :key="index">{{ menu.title }}</el-menu-item>
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
