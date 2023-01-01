<!--  -->
<template>
  <div style="text-align: -webkit-center">
    <el-pagination
      style="width: max-content"
      v-model:current-page="currentPage"
      v-model:page-size="props.pageSize"
      :page-sizes="[100, 200, 300, 400]"
      layout="total, prev, pager, next, jumper"
      :total="props.total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
// const pageSize = ref(1)
// const total = ref(10)
// 接收变量
const props = defineProps(['total', 'pageSize'])
// 传递父组件事件
const emit = defineEmits(['getCurrentPage'])
const handleCurrentChange = (val) => {
  // console.log(val);
  emit('getCurrentPage', val)
}
</script>

<style scoped>
.pagination {
  margin: 0 auto;
  text-align: center;
}
</style>