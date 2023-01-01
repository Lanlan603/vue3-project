<!--  -->
<template>
  <el-tree :props="props" :load="loadNode" lazy show-checkbox @node-click="clickTree" />
</template>

<script setup>
import api from '@/api'
const emit = defineEmits(['changeTree'])
const props = {
  label: 'name',
  children: 'zones',
  isLeaf: 'leaf',
}

// 进入组件--动态默认加载的tree的方法---点击tree还会执行这个函数------
const loadNode = async (node, resolve) => {
    if (node.level === 0) {//自动加载--进入页面执行
        let result = await goodsItemCategory(1)
        return resolve(result);
    }
    if (node.level >= 1) {//点击tree 获取点击的层级级别 请求对应的数据 
        // console.log('请求子级菜单',node.data);
        let result = await goodsItemCategory(node.data.cid)
        return resolve(result);
    }
}
//获取tree数据-----------------------------------
const goodsItemCategory = async (type) => {
    let res = await api.goodsItemCategory({ type })
    // console.log('tree-----', res.data);
    if (res.data.status === 200) {
        return res.data.result;
    } else {
        return [];
    }
}
//点击tree发送数据
const clickTree = (data, node) => {
    // console.log('点击了tree',data,node);
    emit('changeTree', data)
}
</script>

<style  scoped>

</style>
