import {
    tiledMapLayer,
    featureLayer,
    dynamicMapLayer
} from 'esri-leaflet';

import './proj4Leaflet';

import mapTools from '../../components/mapTools/mapTools.vue';

export default {
    name: 'leaflet-map',
    data: () => {
        return {
            pos: {
                x: 0,
                y: 0
            }
        };
    },
    components: {
        mapTools
    },
    mounted: function () {

        let that = this;

        //   定义坐标系
        let crs = new L.Proj.CRS('EPSG:2384', '+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs', {
            origin: [-5123200.0, 1.00021E7],
            resolutions: [
                66.1459656252646,
                8.466683600033868,
                4.233341800016934,
                2.116670900008467,
                1.0583354500042335,
                0.5291677250021167,
                0.26458386250105836
            ]
        });
        let map = L.map('esriMap', {
            crs: crs,
            minZoom: 0,
            maxZoom: 6,
            // renderer: L.canvas(),
            attributionControl: false,
            zoomControl: false,
            doubleClickZoom: false,
            editable: true
        }).on('load', function () {
            console.log('地图初始化好了！');
        }).setView([40.69135891669507, 81.90612688249968], 0);

        this.$store.commit('initMap', map);

        L.control.scale({
            imperial: false
        }).addTo(map);

        // 设置默认控件的属性
        L.control.zoom({
            zoomInTitle: '放大',
            zoomOutTitle: '缩小',
        }).addTo(map);

        // 加载arcgis影像服务
        let yxt = tiledMapLayer({
            url: 'http://202.99.99.98:8399/arcgis/rest/services/KFQTILE/MapServer'
        }).addTo(map);

        // 加载arcgis 矢量服务
        let tfsy = dynamicMapLayer({
            url: 'http://202.99.99.98:8399/arcgis/rest/services/KFQTILE/MapServer',
            layers: [3]
        }).addTo(map);


        // 事件
        map.on('mousemove', function (e) {
            that.pos.x = e.latlng.lng;
            that.pos.y = e.latlng.lat;
        });

    }
};