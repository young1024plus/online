import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import 'weui';
import weui from 'weui.js';


import axios from './util/axios'


Vue.config.productionTip = false




Vue.prototype.$weui = weui;
Vue.prototype.$axios = axios;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
