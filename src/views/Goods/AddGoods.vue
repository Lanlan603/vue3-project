<template>
  <!-- <Breadcrumb></Breadcrumb> -->

  <div class="addGoods">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="menu">
          <div class="title">产品类型列表</div>
          <div class="tree">
            <GoodsTree @changeTree="changeTree"></GoodsTree>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content">
          <div class="subTitle">商品{{goods.title}}</div>
          <div class="wrapper">
            <!-- 
                         el-form
                             :model="ruleForm" 表单数据 object
                             :rules="rules"    校验规则
                             ref="ruleForm"    获取组件from组件 dom 
                             label-width="100px" 标题占据宽度
                             size="small"     用于控制该表单内组件的尺寸	string	medium / small / mini
                         el-form-item
                             label="活动名称"   标题
                             prop="name"         字段标识--调用element-ui内置方法操作 必须写prop
                      -->
            <el-form :model="goodsForm" :rules="rules" ref="ruleForm" label-width="100px" size="small"
              class="demo-ruleForm">
              <el-form-item label="所属分类" prop="category">
                <span class="category"> {{ goodsForm.category }}</span>
              </el-form-item>
              <el-form-item label="商品名称" prop="title">
                <el-input v-model="goodsForm.title"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="price">
                <el-input v-model="goodsForm.price"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="num">
                <el-input v-model="goodsForm.num"></el-input>
              </el-form-item>
              <el-form-item label="商品卖点" prop="sellPoint">
                <el-input v-model="goodsForm.sellPoint"></el-input>
              </el-form-item>
              <el-form-item label="上传图片" prop="image">
                <GoodsUpload @sendImage="sendImage" :fileList="fileList"></GoodsUpload>
                <!-- <GoodsUpload @sendImage="sendImage" :fileList="fileList"></GoodsUpload> -->
              </el-form-item>
              <el-form-item label="商品描述" prop="descs">
                <Wangeditor @sendWangeditor="sendWangeditor" ref="myEditor"></Wangeditor>
              </el-form-item>
              <el-form-item label="首页轮播推荐" prop="isBanner">
                <el-switch v-model="goodsForm.isBanner" active-color="#13ce66"></el-switch>
              </el-form-item>
              <el-form-item label="是否推荐商品" prop="recommend">
                <el-switch v-model="goodsForm.recommend" active-color="#13ce66"></el-switch>
              </el-form-item>
              <el-form-item label="是否上架商品" prop="shelves">
                <el-switch v-model="goodsForm.shelves" active-color="#13ce66"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button v-show="title != '详情'" type="primary" @click="submitForm(ruleForm)">保存</el-button>
                <el-button v-show="title != '详情'" @click="resetForm(ruleForm)">重置</el-button>
                <el-button @click="goGoodsList()" type="info" plain>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive, ref, nextTick } from 'vue'
import GoodsTree from './GoodsTree'
import GoodsUpload from './GoodsUpload'
import Wangeditor from './Wangeditor'
import api from '@/api'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useGoodsStore } from '@/store/Goods'
// 仓库配置
const goods = useGoodsStore()
// 路由配置
const router = useRouter()
// 图片容器
const fileList = ref([])
const ruleForm = ref()
// Wangeditor
const myEditor = ref()
// 表格容器
const goodsForm = reactive({
  cid: '',
  category: '',//分类
  title: '',//名称
  price: '',
  num: '',
  sellPoint: '',
  image: [],
  descs: '',
  isBanner: true,//轮推荐
  recommend: true,//推荐
  shelves: true,//商品上架
})

const rules = reactive({
  category: [
    { required: true, message: '请输入商品类目' }
  ],
  title: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  price: [
    { required: true, message: '请输入商品价格', trigger: 'blur' }
  ],
  num: [
    { required: true, message: '请输入商品数量', trigger: 'blur' }
  ],
  date1: [
    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
  ],
  date2: [
    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
  ],
})
if(goods.title === '编辑') {
  // goodsForm = goods.rowData
  Object.assign(goodsForm, goods.rowData)
  let arr = JSON.parse(goods.rowData.image)
  let img = []
  goodsForm.image = arr
  arr.forEach(ele => {
    let obj = {}
    obj.url = ele
    img.push(obj)
    console.log(img)
  })
  fileList.value = img
  // Wang数据
  nextTick(() => {
    myEditor.value.setWangHtml(goods.rowData.descs)
  })
}
// 接收Tree参数
const changeTree = val => {
  console.log('接收Tree参数', val)
  goodsForm.cid = val.cid
  goodsForm.category = val.name
}
// 接受上传的图片
const sendImage = val => {
  goodsForm.image.push(val)
}
// 接收Wangeditor数据
const sendWangeditor = val => {
  goodsForm.descs = val
}
// 添加商品接口
const addGoods = async (params) => {
  let res = await api.addGoods(params)
  if (res.data.status === 200) {//添加成功--
    //信息提示
    //跳转到产品列表界面--- 
    router.push('/goods/list')
    // 成功信息提示
    ElMessage({
      message: '商品添加成功!',
      type: 'success'
    })
  } else {
    //错误信息提示
    ElMessage.error('错了哦，添加商品失败')
  }
}
//修改商品接口----------------------------------
const changeGoods = async (params) => {
    let res = await api.changeGoods(params)
    console.log('修改结果-----', res.data);
    if (res.data.status === 200) {//修改成功--
        //跳转到产品列表界面--- 
        router.push('/goods/list')
    } else {
        //错误信息提示
        // this.$message.error('错了哦，编辑商品失败');
    }
}
// 保存
const submitForm = async formEl => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('获取表单的输入信息：----', goodsForm);
      //添加商品----参数： title cid  category sellPoint price num descs paramsInfo image
      let { id, title, cid, category, sellPoint, price, num, descs, image } = goodsForm;
       if(goods.title === '添加') {
        addGoods({
          title, cid, category, sellPoint, price, num, descs,
          image: JSON.stringify(image)
        })
       } else {
        changeGoods({
          id, title, cid, category, sellPoint, price, num, descs, image: JSON.stringify(image)
        })
       }
    } else {
            console.log('error submit!', fields)
        }
  })
}
// 重置
const resetForm = formEl => {
  if (goods.title === '添加') {
    if(!formEl) return
  // 清空表单
  formEl.resetFields()
  // 清空图片
  fileList.value = []
  // 清空Wangeditor
  myEditor.value.clearWang()
  } else {
    Object.assign(goodsForm, goods.rowData)
  let arr = JSON.parse(goods.rowData.image)
  let img = []
  goodsForm.image = arr
  arr.forEach(ele => {
    let obj = {}
    obj.url = ele
    img.push(obj)
    console.log(img)
  })
  fileList.value = img
  // Wang数据
  nextTick(() => {
    myEditor.value.setWangHtml(goods.rowData.descs)
  })
  }
}
// 取消
const goGoodsList = () => {
  router.push('/goods/list')
}

</script>

<style lang="less" scoped>
.addGoods {
  margin: 10px;
  // background: #fff;
  padding: 10px;
}

.menu {
  border: 1px solid #eee;
  height: 600px;
  background: #fff;

  .title {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background: skyblue;
    padding-left: 10px;
    font-size: 14px;
  }

  .tree {
    padding: 20px;
  }
}

.content {
  min-height: 800px;
  background: #fff;
  font-size: 14px;

  .subTitle {
    background: #eee;
    color: #000;
    padding: 10px;
    font-weight: bold;
  }

  .wrapper {
    padding: 20px;
  }

  .category {
    color: skyblue;
    font-size: 16px;
  }
}
</style>