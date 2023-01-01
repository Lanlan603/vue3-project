<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="handleCreated" @onChange="onChange" />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const mode = 'default'
const emit = defineEmits(['sendWangeditor'])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref()

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
// 清空方法
const clearWang = () => {
  valueHtml.value = ''
}
//设置内容
const setWangHtml=(val)=>{
    valueHtml.value = val
}

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 记录输入的内容
const onChange = (editor) => {
  emit('sendWangeditor', editor.children[0].children[0].text)
}
// 暴露方法
defineExpose({
  clearWang,
  setWangHtml
})
</script>  