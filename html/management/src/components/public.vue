<template>
  <div class="public">
    <router-view name="nav-bar" class="nav-bar"/>
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
    height: 100%;
    background-image: url("../../static/imgs/bg.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 100%;
  }
  .nav-bar {
    width: 100%;
    height: 60px;
    background: rgba(13, 11, 10, .7);
    position: fixed;
    left: 0;
    top: 0;
  }
  .content-model {
    width: 100%;
    min-height: 500px;
    padding-top: 60px;
    background-color: rgba(249, 249, 249, .5);
  }
</style>
