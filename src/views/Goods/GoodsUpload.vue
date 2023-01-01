<!--  -->
<template>
    <el-upload
        v-model:file-list="props.fileList"
        :action="upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { host, upload } from '@/api/base'
const props = defineProps(['fileList'])
// import type { UploadProps, UploadUserFile } from 'element-plus'
const emit = defineEmits(['sendImage'])
// 数据结构
const fileList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  // dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
//成功上传图片的回调函数-----------------------------
const handleSuccess = (response, file, fileList) => {
    console.log('成功函数', response, file, fileList);
    // this.fileList=fileList;
    //获取一个完整的图片地址---为了--添加商品的时候 需要传递图片地址--- 
    let url = response.url.slice(7);
    let imgUrl = host + '/' + url;
    console.log(imgUrl);
    // this.imgList.push(imgUrl);
    //发送个父组图片路径
   emit('sendImage', imgUrl)
}
</script>

<style  scoped>

</style>
