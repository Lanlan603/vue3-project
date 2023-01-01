<!--  -->
<template>
  <el-menu :default-active="activeMenu()" class="el-menu-vertical-demo" :collapse="isClose" router>
    <el-menu-item> <template #title><span class="frist-item">首客生鲜采购系统</span></template></el-menu-item>
    <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        <span>系统首页</span>
    </el-menu-item>
    <el-sub-menu index="/goods">
      <template #title>
        <el-icon><Goods /></el-icon>
        <span>产品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/goods/list">产品列表</el-menu-item>
        <el-menu-item index="/goods/category">产品分类</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
  props: ['isClose'],
  setup() {
    // 定义开关
    // const isCollapse = ref(false)
    // 使用路由
    const route = useRoute()

    // 导航高亮
    const activeMenu=()=>{
      // console.log('route----route---',route,route.meta.activeMenu);
      let {path,meta} =route;//route
      if(meta.activeMenu){
        return meta.activeMenu;
      }
      return path;
    }

    return {
      route,
      activeMenu
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
  min-height: 400px;
}
.el-menu {
  border-right: none;
  .frist-item {
    color: #1e78bf;
    font-weight: 700;
  }
}
</style>
