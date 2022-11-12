import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "../views/LoginView.vue"
import InfoView from "../views/InfoView.vue"
import RegisterView from "@/views/RegisterView";
import DataScreen from "@/views/DataScreen";
import UserView from "@/views/UserView";
import Produce from "@/views/Produce";
import Detection from "@/views/Detection";
import Logistics from "@/views/Logistics";
import Planting1 from "@/views/Planting1";
import Planting2 from "@/views/Planting2";
import ApplicationView from "@/views/ApplicationView";
import AppLoginView from "@/appview/AppLoginView";
import AppHomeView from "@/appview/AppHomeView";
import SearchView from "@/appview/SearchView";
import AppInfoView from "@/appview/InfoView"
import AppRegisterView from "@/appview/AppRegisterView";
import providerSearchView from "@/appview/ProviderSearchView";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,

  },
  {
    path: '/info',
    name: 'info',
    component: InfoView,

  },
  {
    path: '/screen',
    name: 'screen',
    component: DataScreen,

  },{
    path: '/Planting1',
    name:'Planting1',
    component: Planting1,
  }
  ,{
    path: '/Planting2',
    name:'Planting2',
    component: Planting2,
  }
  ,{
    path: '/Produce',
    name:'Produce',
    component: Produce,
  }
  ,{
    path: '/Detection',
    name:'Detection',
    component:Detection,
  }
  ,{
    path: '/Logistics',
    name:'Logistics',
    component: Logistics,
  }
 ,{
    path: '/user',
    name:'UserView',
    component: UserView,
},{
    path:'/application',
    name:'application',
    component: ApplicationView
  },{
    path:'/FrontLogin',
    name:'FrontLogin',
    component: AppLoginView
  },{
    path: '/appHome',
    name:'/appHome',
    component: AppHomeView
  },{
    path: '/search',
    name:'search',
    component: SearchView
  },{
    path: '/AppInfo',
    name:'AppInfo',
    component: AppInfoView
  },{
    path: '/appRegister',
    name: 'appRegister',
    component: AppRegisterView
  },{
    path:'/providerSearch',
    name:'providerSearch',
    component: providerSearchView
  }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.path === '/managerLogin') {    //若要跳转的页面是登录界面
    next();     //直接跳转
  }
  else if (to.path === '/managerHome'){   //若要跳转的页面是个人界面
    let token = localStorage.getItem('token');    //获取本地存储的token值
    if (token===null||token===''){    //若token为空则验证不成功，跳转到登录页面
      next('/managerLogin');
    }
    else{           //不为空则验证成功
      next();
    }
  }
  else{
    next();
  }
});

export default router;



