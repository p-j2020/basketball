import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import myHead from './components/head'
import myFoot from './components/foot'
import teamList from './components/teamList'

Vue.config.productionTip = false
Vue.component("my-head" ,myHead)
Vue.component("my-foot" ,myFoot)
Vue.component('team-list',teamList)


// Vue.prototype.api = "http://192.168.2.110:8000";
Vue.prototype.api = 'http://localhost:8000';


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
