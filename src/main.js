import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import axios from 'axios'
import home from './components/home.vue';
import empleos from './components/empleos.vue';
import empleosc from './components/empleosc.vue';
import posts from './components/posts.vue';
import dashboard from './components/dashboard.vue';
import resultados from './components/resultados.vue';
import {  } from './components/searchbar.vue';
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
  {path: '/', component:home},
  {name: 'empleos', path:'/empleos/:id', component: empleos}, 
  {name: 'empleosc', path:'/empleosc/:id_categoria', component: empleosc},
  {name: 'posts', path:'/empleos/posts', component: posts},
  {name: 'dashboard', path: '/dashboard', component: dashboard},
  {name: 'busqueda', path: '/busqueda/:words', component: resultados}
]
const router = new VueRouter({
  routes
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
