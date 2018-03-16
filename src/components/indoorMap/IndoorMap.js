import echarts from 'echarts';


export default {
    name: 'indoor-map',
    data: () => {
        return {};
    },
    method: {},
    mounted: function () {
        var params = {
            mapDiv: 'indoorMap'
            //,dim:"2d"
        };
        var indoorMap = IndoorMap(params);

        var testjson;
        var loader = new IndoorMapLoader(indoorMap.is3d);
        // loader.load('http://192.168.11.138:9080/indoor3D/data/testMapData.json', function (mall) {
        loader.load('http://192.168.11.238:6020/indoorMap/data/testMapData.json', function (mall) {
            testjson = mall.jsonData;
            indoorMap.showFloor(1);
            indoorMap.showPubPoints(true);
            indoorMap.setSelectable(true);
            indoorMap.parse(testjson);

            var ul = IndoorMap.getUI(indoorMap);
            document.getElementById('indoorMap').appendChild(ul);
        });

        indoorMap.setSelectionListener(function () {
            console.log(indoorMap.getSelectedId());
        });

        // 显示浏览器刷新帧数stats
        // var stats = new Stats();
        // stats.domElement.style.position = 'absolute';
        // stats.domElement.style.top = '0px';
        // document.body.appendChild(stats.domElement);
        // animate();
        // // 更新stats
        // function animate() {
        //     requestAnimationFrame(animate);
        //     stats.update();
        // }
    }
};