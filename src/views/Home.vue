<template>
  <div>
    <div class="fixed-header">
      <div class="top-bar-container">
        <div class="vab-main">
          <el-row>
            <el-col :xl="7" :lg="7" :md="7" :sm="7" :xs="7">
              <div class="logo-container-horizontal">
                <svg-icon class="vue-icon" icon-class="vueIcon"></svg-icon>
                <span class="title">vue-components</span>
              </div>
            </el-col>
            <el-col :xl="17" :lg="17" :md="17" :sm="17" :xs="17">
              <el-menu
                      background-color="#001529"
                      class="el-menu-demo"
                      text-color="#fff"
                      active-text-color="#fff"
                      :default-active="activeIndex"
                      mode="horizontal"
                      menu-trigger="hover">
                <template v-for="(menu, index) in menus">
                  <side-bar-item :menu="menu" :key="index"></side-bar-item>
                </template>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <app-main></app-main>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBarItem from '@/components/SideBarItem'
import AppMain from '@/components/AppMain'
export default {
  name: 'Home',
  data() {
    return {
      menus: [{
        title: '首页',
        path: '1'
      }, {
        title: '我的组件',
        path: '2',
        children: [{
          title: '选项1',
          path: '2-1'
        },
        {
            title: '选项2',
            path: '2-2'
        },
        {
          title: '选项3',
          path: '2-3',
          children: [{
            title: '选项4',
            path: '2-3-1'
          },
            {
              title: '选项5',
              path: '2-3-2'
            },
            {
              title: '选项6',
              path: '2-3-3'
            }]
        }]
      }, {
        title: '期待一',
        path: '3'
      }, {
        title: '期待二',
        path: '4'
      }],
      activeIndex: '1'
    }
  },
  components: {
    SideBarItem,
    AppMain
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .fixed-header
    position: fixed
    top: 0
    right: 0
    left: 0
    z-index: 997
    width: 100%
    overflow: hidden
    .top-bar-container
      display: flex
      align-items: center
      justify-items: flex-end
      height: 65px
      background: #001529
      .vab-main
        width: 88%
        margin: auto
        background: #001529
        .logo-container-horizontal
          position: relative
          height: 65px
          overflow: hidden
          line-height: 65px
          background: #001529
          .vue-icon
            display: inline-block
            width: 32px
            height: 32px
            margin-right: 5px
            color: #fff
            vertical-align: middle
          .title
            display: inline-block
            overflow: hidden
            font-size: 20px
            font-weight: 600
            line-height: 55px
            color: #fff
            text-overflow: ellipsis
            white-space: nowrap
            vertical-align: middle
        .el-menu
          &.el-menu--horizontal
            display: flex
            align-items: center
            justify-content: flex-end
            height: 65px
            border-bottom: 0 solid transparent !important
          .el-menu-item, .el-submenu__title
            height: 65px
            line-height: 65px
          .el-menu-item
            &.is-active
              background-color: transparent !important;
              border-bottom: 3px solid #1890ff !important
          .el-submenu
            &.is-active
              background-color: transparent !important;
              .el-submenu__title
                border-bottom: transparent !important
            .el-menu-item
              &.is-active
                background-color: #1890ff !important
                border-bottom: 0 solid transparent !important
                .el-submenu__title
                  border-bottom: 0 solid transparent !important
          .el-menu--horizontal
            .el-menu-item, .el-submenu__title
              height: 50px
              line-height: 50px
</style>
