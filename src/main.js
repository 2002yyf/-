import Vue, { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import * as echarts from 'echarts'
import geoJson from '@/utils/china.json'
echarts.registerMap('china', geoJson)
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
import ElementUI from 'element-plus'
import Vant from 'vant';
import 'vant/lib/index.css';


const app = createApp(App)
app.use(store).use(router).use(ElementPlus).use(dataV).use(ElementPlus, {locale: zhCn}).use(ElementUI).use(Vant).mount('#app')
app.config.globalProperties.$echarts = echarts
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.silent = true;

// import axios from "axios";
// import store from './store/index.js';
// Vue.prototype.$ajax = axios
//
// new Vue({
//     el: '#app',
//     router,
//     store,     //store要加进来
//     components: { App },
//     template: '<App/>'
// })
//
// //请求拦截器
// axios.interceptors.request.use(config => {
// //判断是否存在token，如果存在将每个页面的header都添加token
//     if(store.state.token){
//
//         config.headers.common['XX-Token']=store.state.token   //此处的XX-Token要根据登录接口中请求头的名字来写
//     }
//
//     return config;
// }, error => {
// // 请求错误
//     return Promise.reject(error);
// });
//
// //respone拦截器
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//
//     error => {  //默认除了2XX之外都为错误
//         if(error.response){
//             switch(error.response.status){
//                 case 401:
//                     store.commit('delToken');
//                     router.replace({ //跳转到登录页面
//                         path: '/managerLogin',
//                         query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//                     });
//             }
//         }
//         return Promise.reject(error.response);
//     }
// );


