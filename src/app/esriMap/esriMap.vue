<template>
    <div style="position: relative;">
        <div id="esriMap"></div>
        <map-tools></map-tools>
        <span id="draggable">当前坐标：{{pos.x}}，{{pos.y}}</span>
    </div>
</template>
<script src="./esriMap.js"></script>
<style src="./esriMap.css"></style>

