// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'

Vue.config.productionTip = false

//全局样式
import './style/resize.scss';//样式重定义
import './style/common.scss';//公共样式
import './style/element.scss';//element样式重定义

//elementUI组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

/**@name接口请求 */
import conf from "./config/index.js";
import http from "./track/http.js";

Vue.prototype.$http = http
Vue.prototype.$conf = conf
Vue.config.productionTip = false

//文件上传
import updataFile from './components/updataFile';
Vue.prototype.$updataFile  = updataFile;


//swiper
import 'swiper/dist/css/swiper.css';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
