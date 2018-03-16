import Vue from 'vue';
import VueRouter from 'vue-router';


import Map from './Map.vue';
import esriMap from './esriMap/esriMap.vue';
import myCharts from './myCharts/myCharts.vue';
import indoor3D from './indoor3D/indoor3D.vue';

Vue.use(VueRouter);

const routes = [{
    path: '',
    redirect: '/myCharts'
}, {
    path: '/map',
    component: Map
}, {
    path: '/esriMap',
    component: esriMap
}, {
    path: '/myCharts',
    component: myCharts
}, {
    path: '/indoor3D',
    component: indoor3D
}];

export default new VueRouter({
    routes: routes,
    mode: 'hash'
});