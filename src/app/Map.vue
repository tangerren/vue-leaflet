<template>
    <div style="position: relative;">
        <div id="map"></div>
    </div>
</template>

<script>
import '../utils/L.WMTS';
export default {
    name: 'leaflet-map',
    data() {
        return {

        };
    },
    mounted: function() {
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
        let map = L.map('map', {
            crs: L.CRS.EPSG4326,
            center: {
                lon: 117.65,
                lat: 39.007
            },
            layers: [image, vector, extent],
            minZoom: 6,
            maxZoom: 16,
            maxBounds: L.latLngBounds([38.58251882187733, 116.81762695312358], [39.48708498168709, 117.89432392884295]),
            zoom: 10
        });

        // 存储map
        this.$store.commit('initMap', map);
        L.control.layers({
            '影像图': image,
            '矢量图': vector
        }, {
            '一园十区': extent
        }).addTo(map);
    }
};
</script>

<style>
#map {
    width: 800px;
    height: 800px
}
</style>
