import Vue from 'vue'
import App from './App.vue'
// import vueResource from "vue-resource"
import axios from 'axios'
import router from './router/'
// import store from './store/'

// Vue.use(vueResource)
// Vue.use(axios)    //axios是一个独立的插件，不需要使用vue.use!!!
Vue.prototype.$axios = axios    //原型链上添加方法

Vue.config.productionTip = false

// 初始化viewmodel
new Vue({
  el: '#app', // 挂载到html页面
  router,
  // store,
  render: h => h(App)
})
