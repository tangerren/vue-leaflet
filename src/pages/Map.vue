<template>
    <div style="position: relative;">
        <div id="tjMap" style="width:800px;height:850px;"></div>
        <map-tools></map-tools>
        <span id="draggable">当前坐标：{{pos.x}}，{{pos.y}}</span>
    </div>
</template>

<script>
import "../utils/L.WMTS";

import mapTools from "../components/mapTools/mapTools.vue";
import "leaflet.heat";
import "leaflet.markercluster";
import "../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css";
import "../../node_modules/leaflet.markercluster/dist/MarkerCluster.css";

export default {
  name: "leaflet-map",
  data() {
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
  mounted: function() {
    let self = this;

    // WMS方式加载影像瓦片图层
    var image = new L.TileLayer
      .WMTS("http://192.168.11.218:9999/geoserver/gwc/service/wmts?", {
      layer: "TJ:L15",
      tilematrixset: "EPSG:900913"
    });

    // 初始化地图
    let map = L.map("tjMap", {
      layers: [image],
      minZoom: 10,
      maxZoom: 17,
      zoom: 10,
      editable: true,
      editOptions: {
        skipMiddleMarkers: true
      }
    })
      .on("load", function() {
        console.log("地图初始化好了！");
      })
      .setView([38.961685001850127, 117.00589048862463], 15);

    // 存储map
    this.$store.commit("initMap", map);

    // 事件
    map.on("mousemove", function(e) {
      self.pos.x = e.latlng.lng;
      self.pos.y = e.latlng.lat;
    });
  }
};
</script>

<style>
#map {
  width: 800px;
  height: 800px;
}
</style>
