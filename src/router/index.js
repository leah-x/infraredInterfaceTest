import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import home from '../components/home.vue'
import login from '../components/login.vue'
import userinfo from '../components/user/userinfo.vue'
import role from '../components/user/role.vue'
import loginUser from '../components/user/loginUserInformation.vue'
import mainPage from '../components/firstPage/mainPage.vue'
import createTaskGroup from '../components/taskManagement/createTaskGroups.vue'
import CreateTask from '../components/taskManagement/CreateTask.vue'
import taskGroupDiagInfo from '../components/diag/TaskGroupDiagInfo'
import ExecuteTask from "../components/taskManagement/ExecuteTask.vue"
import DoneTask from "../components/taskManagement/DoneTask.vue"
import flawShow from "../components/flaw/flawShow";
import flawDetail from "../components/flaw/flawDetail";
import reportShow from "../components/report/reportShow";
import groupDetail from "../components/diag/groupDetail.vue"
import taskDiagDetail from "../components/diag/taskDiagDetail.vue"
Vue.use(Router)



export default new Router({
  routes: [
   {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/home',
      name: 'home',
      component: home,
      children:[
        {
          path: '/userinfo',
          name: 'userinfo',
          component: userinfo
        },{
          path: '/role',
          name: role,
          component: role
        },{
          path: '/loginUser',
          name: loginUser,
          component: loginUser
        },{
          path: '/mainPage',
          name: mainPage,
          component: mainPage
        },{
          path: '/createTaskGroup',
          name: createTaskGroup,
          component: createTaskGroup
        },{
          path: '/CreateTask',
          name: CreateTask,
          component: CreateTask
        },{
          path: '/taskGroupDiagInfo',
          name: taskGroupDiagInfo,
          component: taskGroupDiagInfo
        },{
          path: '/groupDetail',
          name: groupDetail,
          component: groupDetail
        },{
          path: '/taskDiagDetail',
          name: taskDiagDetail,
          component: taskDiagDetail
        },{
          path: '/DoneTask',
          name: DoneTask,
          component: DoneTask
        },
        {
          path: '/ExecuteTask',
          name: ExecuteTask ,
          component: ExecuteTask 
        },
        {
          path: '/flawShow',
          name: flawShow,
          component: flawShow
        },{
          path: '/flawDetail',
          name: flawDetail,
          component: flawDetail
        },{
          path: '/reportShow',
          name: reportShow,
          component: reportShow
        },
	  ],
    },{
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
  ]
})

// 解决导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
