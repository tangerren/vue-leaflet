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
        let crs = new L.Proj.CRS('EPSG:4490', '+proj=longlat +ellps=GRS80 +no_defs', {
            origin: [-180, 90],
            resolutions: [
                0.7031250000000002,
                0.3515625000000001,
                0.17578125000000006,
                0.08789062500000003,
                0.043945312500000014,
                0.021972656250000007,
                0.010986328125000003,
                0.005493164062500002,
                0.002746582031250001,
                0.0013732910156250004,
                6.866455078125002E-4,
                3.433227539062501E-4,
                1.7166137695312505E-4,
                8.583068847656253E-5,
                4.2915344238281264E-5,
                2.1457672119140632E-5,
                1.0728836059570316E-5,
                5.364418029785158E-6
            ]
        });
        let map = L.map('esriMap', {
            crs: crs,
            minZoom: 6,
            maxZoom: 17,
            // renderer: L.canvas(),
            attributionControl: false,
            zoomControl: false,
            doubleClickZoom: false,
            editable: true
        }).on('load', function () {
            console.log('地图初始化好了！');
        }).setView([29.61685001850127, 106.50589048862463], 10);

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
            url: 'http://192.168.11.218:6080/arcgis/rest/services/CQImage/MapServer'
        }).addTo(map);

        // 加载arcgis 矢量服务
        let tfsy = dynamicMapLayer({
            url: 'http://zxdl.digitalcq.com:6080/arcgis/rest/services/gsjt_tfsy/MapServer',
            layers: [3]
        }).bindPopup(function (err, featureCollection, response) {
            let attr = featureCollection.features[0];
            if (attr) {
                return '<div class=popup-title>存量用地</div>' + '<br>' +
                    '统一编号：' + attr.properties['统一编号'] + '<br>' +
                    '桩号：' + attr.properties['桩号'] + '<br>' +
                    '土地权证号：' + attr.properties['土地权证号'] + '<br>' +
                    '图幅编号：' + attr.properties['图幅编号'] + '<br>' +
                    '征地成本（万元）：' + attr.properties['征地成本（万元）'] + '<br>' +
                    '征地批文号：' + attr.properties['征地批文号'] + '<br>' +
                    '原征地用途：' + attr.properties['原征地用途'] + '<br>' +
                    '管理现状：' + attr.properties['管理现状'] + '<br>' +
                    '土地现状：' + attr.properties['土地现状'] + '<br>' +
                    '土地性质：' + attr.properties['土地性质'] + '<br>' +
                    '地块面积：' + attr.properties['地块面积'] + '<br>' +
                    '面积（亩）：' + attr.properties['面积（亩）'] + '<br>' +
                    '地理位置：' + attr.properties['地理位置'];
            } else {
                return false;
            }
        }, {
            className: 'myPopup',
            autoClose: false
        }).addTo(map);

        // 加载arcgis 矢量服务
        let CSGH = dynamicMapLayer({
            url: 'http://222.178.118.101:6084/arcgis/rest/services/GLGH_CXGH_CXZTGH_CSJSYDGH/MapServer'
        }).bindPopup(function (err, featureCollection, response) {
            let attr = featureCollection.features[0];
            if (attr) {
                return '<div class=popup-title>城市规划</div>' + '<br>' +
                    '规划类型：' + attr.properties['大类名称'] + '<br>' +
                    '面积(公顷)：' + attr.properties['面积(公顷)'] + '<br>' +
                    '数据来源：' + attr.properties['数据来源'];
            } else {
                return false;
            }
        }, {
            className: 'myPopup',
            autoClose: false
        }).addTo(map);

        // 事件
        map.on('mousemove', function (e) {
            that.pos.x = e.latlng.lng;
            that.pos.y = e.latlng.lat;
        });

    }
};