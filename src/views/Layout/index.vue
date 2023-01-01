<!--  -->
<template>
  <div class="menu">
    <MyMenu :isClose="isClose"></MyMenu>
  </div>
  <div class="content" :class="{active:isClose}">
    <Content :isClose="isClose" @change="change"></Content>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MyMenu from './MyMenu'
import Content from './Content'

    let isClose = ref(false);
    // 修改菜单折叠变量
    const change = () => {
      isClose.value = !isClose.value
    }
</script>

<style  scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}
.content {
  padding-left: 200px;
  transition: all .5s;
}
.active {
  padding-left: 64px;
}
</style>
