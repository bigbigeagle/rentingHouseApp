import App from './App'
// import BaiduMap from 'vue-baidu-map'

// Vue.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'FBZG0MCbBIrNrL8X0F56zYdgOYTs4xcG'
// })

// #ifndef VUE3
import Vue from 'vue'
import store from './store'
import uView from "uview-ui";
import bm from './components/bm.vue'
import { myRequest } from './util/request.js'
import axios from 'axios'


// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'FBZG0MCbBIrNrL8X0F56zYdgOYTs4xcG'
// })

Vue.use(uView);    
Vue.component('bm',bm)
Vue.prototype.$myRequest = myRequest
Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.config.productionTip = false
// 服务器真实ip地址
const baseURL = 'http://192.168.123.24:3007'
Vue.prototype.$baseURL = baseURL
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif