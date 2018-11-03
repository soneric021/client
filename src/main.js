import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import axios from 'axios'
import VueCookies from 'vue-cookies';
import VueSession from 'vue-session';
import VueRouter from 'vue-router';

//import routes from './routes';

Vue.config.productionTip = false
Vue.use(axios)
Vue.use(VueCookies)
Vue.use(VueSession)
Vue.use(VueRouter)

const routes = [
  {path: '/', component:App }
]
const router = new VueRouter({
  routes
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
