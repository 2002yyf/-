import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "../views/LoginView.vue"
import InfoView from "../views/InfoView.vue"
import RegisterView from "@/views/RegisterView";
import DataScreen from "@/views/DataScreen";
import UserView from "@/views/UserView";
import Detection from "@/views/Detection";
import Logistics from "@/views/Logistics";
import AppLoginView from "@/appview/AppLoginView";
import AppHomeView from "@/appview/AppHomeView";
import SearchView from "@/appview/SearchView";
import AppInfoView from "@/appview/InfoView"
import AppRegisterView from "@/appview/AppRegisterView";
import providerSearchView from "@/appview/ProviderSearchView";
import UploadProjectView from "@/appview/UploadProjectView";
import NewProjectView from "@/appview/NewProjectView";
import SearchResultView from "@/appview/SearchResultView";
import PersonView from "@/appview/PersonView";
import UploadDetectionView from "@/appview/UploadDetectionView";
import UploadLogisticsView from "@/appview/UploadLogisticsView";
import Planting from "@/views/Planting";
import GrowView from "@/appview/GrowView";
import ApplicationToProvider from "@/appview/ApplicationToProvider";
import MyInfoView from "@/appview/MyInfoView";

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
    path: '/Planting',
    name:'Planting',
    component: Planting,
  },
  {
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
    path:'/FrontLogin',
    name:'FrontLogin',
    component: AppLoginView
  },{
    path: '/appHome',
    name:'appHome',
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
  },{
    path:'/uploadProject',
    name: 'uploadProject',
    component: UploadProjectView
  },{
    path: '/newProjectView',
    name: 'newProjectView',
    component: NewProjectView
  },{
    path: '/searchResultView',
    name: '/searchResultView',
    component: SearchResultView
  },{
    path: '/personView',
    name: '/personView',
    component: PersonView
  },{
    path:'/uploadDetectionView',
    name:'/uploadDetectionView',
    component: UploadDetectionView
  },{
    path: '/uploadLogisticsView',
    name:'/uploadLogisticsView',
    component: UploadLogisticsView
  },{
    path: '/growView',
    name:'/growView',
    component: GrowView
  },{
    path: '/applicationToProvider',
    name: '/applicationToProvider',
    component: ApplicationToProvider
  },{
    path:'/myInfo',
    name: '/myInfo',
    component: MyInfoView
  }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


// router.beforeEach((to, from, next) => {
//   if (to.path === '/managerLogin') {    //????????????????????????????????????
//     next();     //????????????
//   }
//   else if (to.path === '/managerHome'){   //????????????????????????????????????
//     let token = localStorage.getItem('token');    //?????????????????????token???
//     if (token===null||token===''){    //???token????????????????????????????????????????????????
//       next('/managerLogin');
//     }
//     else{           //????????????????????????
//       next();
//     }
//   }
//   else{
//     next();
//   }
// });

export default router;



