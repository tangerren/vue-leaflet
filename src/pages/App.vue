<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="map" name="third"></el-tab-pane>
      <el-tab-pane label="esriMap" name="esriMap"></el-tab-pane>
      <el-tab-pane label="myCharts" name="myCharts"></el-tab-pane>
      <el-tab-pane label="indoor3D" name="indoor3D"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      activeName: 'myCharts'
    };
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push({ path: tab.label });
    }
  }, mounted: function() {
    this.activeName = this.$route.path.match(/\/(\S*)/)[1];
  }
};
</script>

<style>

</style>
