import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import '@/assets/css/base.css'
// 导入element-ui小图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// element-ui小图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 挂载全局Echarts
// 方式一
import echarts from './plugin/echarts'
app.config.globalProperties.$echarts = echarts
// 方式二
app.provide('echarts', echarts)
// elementUI汉化
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn"; //需要新加的代码
app.use(ElementPlus, { locale }); //需要改变的地方，加入locale
//导入pinia
import { createPinia } from "pinia";
app.use(createPinia());

app.use(router).mount('#app')
