import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        map: null //保存地图对象  
    },
    mutations: {
        //注册map对象
        initMap: function (state, payload) {
            state.map = payload;
        }
    }
});