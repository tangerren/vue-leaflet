import 'leaflet-editable';
import 'leaflet-measure-path';
import moment from 'moment';
export default {
    name: 'map-tools',
    data: () => {
        return {
            popups: [],
            dPolyline: null,
            dPolygon: null,
        };
    },
    computed: {
        map: function () {
            return this.$store.state.map;
        }
    },
    methods: {
        measure: function (type) {
            let self = this;
            this.clear();
            // 线
            if (type === 'polyline') {
                this.dPolyline = this.map.editTools.startPolyline(null, {
                    // color: 'red', 
                    bubblingMouseEvents: false
                });
                this.dPolyline.on('editable:drawing:clicked editable:vertex:dragend editable:vertex:deleted', function () {
                    self.dPolyline.showMeasurements().updateMeasurements();
                });
            }
            // 面
            if (type === 'polygon') {
                this.dPolygon = this.map.editTools.startPolygon(null, {
                    color: 'red',
                    bubblingMouseEvents: false
                });
                this.dPolygon.on('editable:drawing:clicked editable:vertex:dragend editable:vertex:deleted', function () {
                    self.dPolygon.showMeasurements().updateMeasurements();
                });
            }
            // 矩形
            if (type === 'rectangle') {
                this.dPolygon = this.map.editTools.startRectangle(null, {
                    color: 'red',
                    bubblingMouseEvents: false
                });
                this.dPolygon.on('editable:drawing:clicked editable:vertex:dragend editable:vertex:deleted', function () {
                    self.dPolygon.showMeasurements().updateMeasurements();
                });
            }
            // 圆
            if (type === 'circle') {
                this.dPolygon = this.map.editTools.startCircle(null, {
                    color: 'red',
                    bubblingMouseEvents: false
                });
                this.dPolygon.on('editable:drawing:clicked editable:vertex:dragend editable:vertex:deleted', function () {
                    self.dPolygon.showMeasurements().updateMeasurements();
                });
            }
        },
        pan: function () {
            console.log('平移');
        },
        clear: function () {
            console.log('清除');
            this.popups = [];
            // this.enabledPopup();
            this.map.closePopup();
            if (this.dPolyline) {
                this.dPolyline.hideMeasurements();
                this.dPolyline.remove();
                this.dPolyline = null;
            }
            if (this.dPolygon) {
                this.dPolygon.hideMeasurements();
                this.dPolygon.remove();
                this.dPolygon = null;
            }
        },
        disabledPopup: function () {
            let self = this;
            this.map.eachLayer(function (l) {
                self.popups.push(l.getPopup());
                l.unbindPopup();
            });
        },
        enabledPopup: function () {
            this.map.eachLayer(function (l) {
                l.bindPopup();
            });
        },
        disabledDraw: function () {
            this.map.editTools.stopPolygon();
            this.map.editTools.stopPolygon();
        }
    },
    mounted: function () {
        console.warn(moment());
        L.Editable.VertexIcon = L.DivIcon.extend({
            options: {
                iconSize: new L.Point(10, 10)
            }
        });
        L.Editable.TouchVertexIcon = L.DivIcon.extend({
            options: {
                iconSize: new L.Point(10, 10)
            }
        });
    }
};