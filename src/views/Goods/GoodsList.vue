<!--  -->
<template>
  <div class="list-header">
    <!-- 查询模块 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="产品名称">
        <el-input v-model="formInline.name" placeholder="产品名称" />
      </el-form-item>
      <el-form-item label="产品类型">
        <el-select v-model="formInline.region" placeholder="产品类型">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 添加和删除按钮 -->
    <el-button type="warning" :icon="Plus" @click="addGoods">添加商品</el-button>
    <el-button type="danger" :icon="Delete" @click="deleteAllSelect">删除商品</el-button>
  </div>
  <!-- 表格展示部分 -->
  <div class="wrapper">
    <el-table :data="tableData" border style="width: 100%;" :header-row-style="{ color: '#333', textAlgin: 'center' }"
      @selection-change="changeTable">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" label="商品编号" width="120">
      </el-table-column>
      <el-table-column prop="title" label="商品名称" width="180" show-overflow-tooltip>
        <!-- <template slot-scope="scope">
              <span @click="goodsDesc(scope.row)" style="color:blue;cursor: pointer;">{{scope.row.title}}</span>
          </template> -->
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="120">
      </el-table-column>
      <el-table-column prop="category" label="商品类目" width="140">
      </el-table-column>
      <el-table-column prop="create_time" label="添加时间" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" :icon="EditPen" type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" :icon="Delete" type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 分页器 -->
    <Pagination :total="total" :pageSize="pageSize" @getCurrentPage="getCurrentPage"></Pagination>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Delete, Plus, EditPen } from '@element-plus/icons-vue'
import api from '@/api'
import dayjs from 'dayjs'
import { removeHTMLTag } from '@/utils/utils'
import Pagination from '@/components/Pagination'
import { useRouter } from 'vue-router'
import { useGoodsStore } from '@/store/Goods'
// 仓库配置
const goods = useGoodsStore()
// 路由配置
const router = useRouter()
// 分页器数据
const total = ref(0)
const pageSize = ref(0)
// id容器
let ids = ref([])
// 搜索模块
const formInline = reactive({
  name: '',
  region: '',
})
// 查询模块
const onSubmit = async () => {
  let res = await api.getGoodsSearch({
    search: formInline.name
  })
  if (res.data.status === 200) {
    // 状态码为200表示成功, 处理展示数据
    tableData.value = res.data.result
    total.value = res.data.result.length
    pageSize.value = 8
  } else {
    // 没有匹配结果, 展示为空
    tableData.value = []
    total.value = 0
    pageSize.value = 0
  }
}

// 请求表格数据
const getGoodsList = async (page) => {
  let res = await api.getGoodsList({ page })
  // 处理数据
  let arr = res.data.data
  arr.forEach(ele => {
    ele.create_time = dayjs(ele.create_time).format('YYYY-MM-DD HH:mm:ss')
    ele.descs = removeHTMLTag(ele.descs)
  })
  tableData.value = res.data.data
  total.value = res.data.total
  pageSize.value = res.data.pageSize
}
// 进入页面展示信息
getGoodsList(1)
// 表格展示部分
const tableData = ref([])
// 表格编辑按钮
const handleEdit = (index, row) => {
  goods.changeTitle('编辑')
  goods.changeRowData(row)
  router.push('/goods/addgoods')
}
// 表格删除按钮
const handleDelete = async (index, row) => {
  let res = await api.deleteGoods({
    id: row.id
  })
  if(res.data.status === 200) {
    // 更新视图
    getGoodsList(1)
  }
}
// 多选择框
const changeTable = val => {
  // console.log(val)
  let arr = []
  val.forEach(ele => {
    arr.push(ele.id)
  })
  ids.value = arr
}
// 批量删除请求接口
const deleteAllSelect = async () => {
  let res = await api.batchDelete({
    ids: ids.value
  })
  if(res.data.status === 200) {
    // 更新视图
    getGoodsList(1)
  }
}
// 分页器功能
const getCurrentPage = val => {
  console.log('点击分页', val)
  getGoodsList(val)
}
// 添加商品按钮
const addGoods = () => {
  goods.changeTitle('添加')
  router.push('/goods/addgoods')
}
</script>

<style  scoped>
.list-header {
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 6px;
}

.wrapper {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
