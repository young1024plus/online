import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import 'weui';
import weui from 'weui.js';

Vue.prototype.$weui = weui;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
