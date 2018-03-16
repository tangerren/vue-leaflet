import {
    tiledMapLayer,
    featureLayer
} from 'esri-leaflet';

import './proj4Leaflet';

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
    mounted: function () {
        //   定义坐标系
        var crs = new L.Proj.CRS('EPSG:4490', '+proj=longlat +ellps=GRS80 +no_defs', {
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


        // 初始化地图
        let map = L.map('esriMap', {
            crs: L.CRS.EPSG4326, //4326和4490很相似
            // crs: crs,
            minZoom: 6,
            maxZoom: 17,
            renderer: L.canvas(),
            attributionControl: false,
            zoomControl: false
        }).setView([29.61685001850127, 106.50589048862463], 10);

        // map.fitBounds(L.latLngBounds(L.latLng(29.54,107.551), L.latLng(29.541, 107.5512)));

        // map.locate();
        map.on('locationfound', function (e) {
            map.setView([29.61685001850127, 106.50589048862463], 12);
        });
        map.on('locationerror', function (e) {
            console.info(e);
        });

        L.control.scale({
            imperial: false
        }).addTo(map);
        // 设置默认控件的属性
        L.control.zoom({
            zoomInTitle: '放大',
            zoomOutTitle: '缩小',
        }).addTo(map);

        // 加载arcgis影像服务
        let a = tiledMapLayer({
            url: 'http://192.168.11.218:6080/arcgis/rest/services/CQImage/MapServer'
        });
        a.addTo(map);

        // 加载arcgis 矢量服务
        let region = featureLayer({
            url: 'http://192.168.11.218:6080/arcgis/rest/services/CQSCJG/cqgsj_gsfj/MapServer/0',
            style: function () {
                return {
                    color: '#70ca49',
                    weight: 2
                };
            }
        }).addTo(map);

        let popupTemplate = '<h3>{orgCode}</h3>{abbr_org}';
        // 自定义图层绑定popup
        region.bindPopup(function (e) {
            return L.Util.template(popupTemplate, e.feature.properties);
        });

        // 添加自定义形状
        var marker = L.marker([29.61685001850127, 106.50589048862463], {
            draggable: true,
            riseOnHover: true
        }).addTo(map);

        var circle = L.circle([29.552553, 107.501335], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 10000
        }).addTo(map);

        var polygon = L.polygon([
            [29.54, 107.551],
            [29.54, 107.50],
            [29.65, 107.50]
        ]).addTo(map);

        // 自定义要素绑定popup
        // marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
        marker.bindTooltip('my tooltip text').openTooltip();
        circle.bindPopup('I am a circle.');
        polygon.bindPopup('I am a polygon.');

        // 手动添加popup
        var popup = L.popup({
                autoPan: false, // 默认是true，会导致地图会自动平移到该popup范围内
                attribution: '哈哈哈哈哈'
            })
            .setLatLng([29.552553, 107.0])
            .setContent('I am a standalone popup.')
            .openOn(map); // 会自动关闭上次打开的popup
        // .addTo(map); // 不会自动关闭已经打开的popup

        var that = this;
        // 事件
        map.on('mousemove', function (e) {
            that.pos.x = e.latlng.lng;
            that.pos.y = e.latlng.lat;
        });
        
    }
};