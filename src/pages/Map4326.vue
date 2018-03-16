<template>
    <div style="position: relative;">
        <div id="tjMap" style="width:800px;height:850px;"></div>
        <map-tools></map-tools>
        <span id="draggable">当前坐标：{{pos.x}}，{{pos.y}}</span>
    </div>
</template>

<script>
import '../utils/L.WMTS';

import mapTools from '../components/mapTools/mapTools.vue';
import 'leaflet.heat';
import 'leaflet.markercluster';
import '../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../../node_modules/leaflet.markercluster/dist/MarkerCluster.css';

export default {
    name: 'leaflet-map',
    data() {
        return {
            pos: {
                x: 0,
                y: 0
            }
        };
    }, components: {
        mapTools
    },
    mounted: function() {

        let self = this;

        // WMTS参数
        var matrixIds = [];
        for (var i = 0; i < 21; i++) {
            matrixIds[i] = {
                identifier: i,
                topLeftCorner: new L.LatLng(90, -180)
            };
        }

        // WMS方式加载影像瓦片图层
        var image = new L.TileLayer.WMTS('http://192.168.11.218:9999/geoserver/gwc/service/wmts?', {
            layer: 'TJ:TJ_image',
            tilematrixset: 'EPSG:4326',
            matrixIds: matrixIds
        });

        // WMS方式加载矢量瓦片图层
        var vector = new L.TileLayer.WMTS('http://192.168.11.218:9999/geoserver/gwc/service/wmts?', {
            layer: 'TJ:TJ_vector',
            tilematrixset: 'EPSG:4326',
            matrixIds: matrixIds
        });

        // WMS方式加载矢量图层
        let extent = L.tileLayer.wms('http://192.168.11.218:9999/geoserver/TJ/wms', {
            layers: 'TJ:area',
            format: 'image/png',
            transparent: true
        });

        // 初始化地图
        let map = L.map('tjMap', {
            crs: L.CRS.EPSG4326,
            // center: {
            //     lon: 117.65,
            //     lat: 39.007
            // },
            layers: [vector, extent],
            minZoom: 9,
            maxZoom: 16,
            // maxBounds: L.latLngBounds([38.58251882187733, 116.81762695312358], [39.48708498168709, 117.89432392884295]),
            zoom: 10,
            editable: true,
            editOptions: {
                skipMiddleMarkers: true
            }
        }).on('load', function () {
            console.log('地图初始化好了！');
        }).setView([38.961685001850127, 117.00589048862463], 9);

        // 聚合图
        var clusterLayer = L.markerClusterGroup();
        // 热力图
        var heatLayer = L.heatLayer([], { radius: 100 });
        for (let i = 0; i < 5000; i++) {
            clusterLayer.addLayer(L.marker([(Math.random() + 38.5), (Math.random() + 117.1)]));
            heatLayer.addLatLng([(Math.random() + 38.5), (Math.random() + 117.1)])
        }


        // 存储map
        this.$store.commit('initMap', map);
        L.control.layers({
            '影像图': image,
            '矢量图': vector
        }, {
                '聚合图': clusterLayer,
                '热力图': heatLayer,
                '一园十区': extent
            }).addTo(map);

        // 事件
        map.on('mousemove', function(e) {
            self.pos.x = e.latlng.lng;
            self.pos.y = e.latlng.lat;
        });

    }
};
</script>

<style>
#map {
    width: 800px;
    height: 800px
}
</style>
