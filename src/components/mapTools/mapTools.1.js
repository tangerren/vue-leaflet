import 'leaflet-measure-path';

export default {
    name: 'map-tools',
    data: () => {
        return {
            arrXY: [],
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
            this.arrXY = [];
            this.disabledPopup();
            this.map.closePopup();
            // 线
            if (type === 'polyline') {
                this.dPolyline.addTo(this.map).showMeasurements();
                this.map.on('click', this.drawLine);
                this.map.addOneTimeEventListener('dblclick', function (e) {
                    console.log('线双击');
                    self.map.off('click', self.drawLine);
                    self.enabledPopup();
                });
            }
            // 面
            if (type === 'polygon') {
                this.dPolygon.addTo(this.map).showMeasurements();
                this.map.on('editable:vertex:drag editable:vertex:deleted', this.dPolygon.updateMeasurements, this.dPolygon);
                this.map.on('click', this.drawArea);
                this.map.once('dblclick', function (e) {
                    console.log('面双击');
                    self.map.off('click', self.drawArea);
                    self.enabledPopup();
                });
            }
        },
        pan: function () {
            console.log('平移');
            this.map.off('click');
            this.map.off('dblclick ');
        },
        clear: function () {
            console.log('清除');
            this.arrXY = [];
            this.popups = [];
            this.enabledPopup();
            this.map.closePopup();
            this.map.off('click');
            this.map.on('editable:vertex:drag editable:vertex:deleted');
            this.dPolyline.remove();
            this.dPolygon.remove();
            this.dPolyline.setLatLngs([]);
            this.dPolygon.setLatLngs([]);
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
        drawLine: function (e) {
            this.arrXY.push([e.latlng.lat, e.latlng.lng]);
            this.dPolyline.setLatLngs(this.arrXY);
        },
        drawArea: function (e) {
            this.arrXY.push([e.latlng.lat, e.latlng.lng]);
            this.dPolygon.setLatLngs(this.arrXY);
        }
    },
    mounted: function () {
        this.arrXY = [
            [33.387451171874986, 100.57983398437506],
            [32.596435546874986, 100.46997070312506],
            [32.431640624999986, 101.15112304687506],
            [33.266601562499986, 101.45874023437506]
        ];
        this.dPolyline = L.polyline(this.arrXY, {
            color: 'red'
        }).unbindPopup();
        this.dPolygon = L.polygon(this.arrXY, {
            color: 'red'
        }).unbindPopup();
    }
};