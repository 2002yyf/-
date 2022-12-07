import  { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import geoJson from '@/utils/china.json'
echarts.registerMap('china', geoJson)
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
import Vant from 'vant';
import '@/filter/index.js'
import 'vant/lib/index.css';

const app = createApp(App)
app.use(store).use(router).use(ElementPlus).use(dataV).use(Vant).mount('#app')
app.config.globalProperties.$echarts = echarts
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.silent = true;



