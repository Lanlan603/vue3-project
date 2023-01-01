<!--  -->
<template>
  <div class="header">
    <div class="icon" @click="change">
    <el-icon v-if="isClose"><DArrowRight /></el-icon>
    <el-icon v-else><DArrowLeft /></el-icon>
    </div>
    <div class="right">
      <div class="time">{{ time }}</div>
      <div class="line">|</div>
      <div class="loginout" @click="out"><el-icon><SwitchButton /></el-icon></div>
    </div>
  </div>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
export default {
  props:['isClose'],
  emits:['change'],
  setup(props,{emit}) {
    // 定义时间变量
    let time = ref(null)
    // 切换菜单折叠
    const change = () => {
      emit('change')
    }
    // 生命周期函数
    onMounted(() => {
      // 获取实时时间
      time.value = dayjs(new Date()).format('YYYY-MM-DD HH:mm')
    })
    // 退出登录
    const router = useRouter()
    const out = () => {
      router.push('/login')
    }
    return {
      change,
      time,
      out
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  line-height: 50px;
  color: white;
  background-color: #1e78bf;
  .icon {
    flex: 1;
    font-size: 24px;
    i {
      vertical-align: middle;
      cursor: pointer;
    }
  }
}
.right {
  // float: right;
  display: flex;
  padding-right: 20px;
  .time {
    font-size: 14px;
  }
  .line {
    padding-left: 10px;
    padding-right: 10px;
  }
  .loginout {
    margin-top: 2px;
  }
}
.wrapper {
  margin: 10px;
}
</style>
