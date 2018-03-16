import 'element-ui/lib/theme-default/index.css'; //element-ui样式
import 'font-awesome/css/font-awesome.min.css'; //font-awesome样式

import Vue from 'vue';
import ElementUI from 'element-ui';
import Axios from 'axios';
import VueCookie from 'vue-cookie';
import Vuex from 'vuex';

import 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-measure-path/leaflet-measure-path.css'; //通用样式
import './utils/L.hack';
import proj4 from 'proj4';
window.proj4 = proj4;

import store from './pages/store'; //vuex初始化
import router from './pages/router'; //路由初始化

import App from './pages/App.vue';

Vue.use(ElementUI);
Vue.use(VueCookie);
//http
Vue.prototype.$http = Axios;
Axios.defaults.withCredentials = true;
//事件总线
var bus = new Vue();
Vue.prototype.$bus = bus;

new Vue({
  store: store,
  router: router,
  el: '#app',
  render: h => h(App)
});