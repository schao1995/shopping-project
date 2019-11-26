<template>
  <div class="public">
    <router-view name="nav-bar" class="nav-bar"/>
    <router-view name="bread-crumb" class="bread-crumb"/>
    <router-view class="content-model"/>
  </div>
</template>

<script>
export default {
  name: 'public'
}
</script>

<style scoped>
  .public {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .nav-bar {
    width: 200px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: #14ddd6;
  }
  .bread-crumb {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    position: absolute;
    padding-left: 200px;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .content-model {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute;
    padding-left: 200px;
    padding-top: 60px;
    top: 0;
    left: 0;
  }
</style>
