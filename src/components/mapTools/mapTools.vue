<template>
    <div class="map-tools">
        <button @click="pan()">平移</button>
        <button @click="measure('polyline')">长度测量</button>
        <button @click="measure('polygon')">面积测量1</button>
        <button @click="measure('rectangle')">面积测量2</button>
        <button @click="measure('circle')">面积测量3</button>
        <button @click="clear()">清除</button>
    </div>
</template>
<script src="./mapTools.js"></script>
<style src="./mapTools.scss"></style>

