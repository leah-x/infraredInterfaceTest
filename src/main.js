// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
//引入echarts容器
import echarts from 'echarts'

import axios from 'axios'
import qs from 'qs'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

//引入API文件
import api from './netapi/index'
//将API方法绑定到全局
Vue.prototype.$api=api


//设置屏幕自适应
import './utils/flexible'

// 引入全局变量
import common from "./utils/common"
Vue.use(common)

// 引入通用函数
import util from "./utils/util";
Vue.use(util)

Vue.prototype.$axios = axios
Vue.prototype.qs = qs

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(Antd)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
