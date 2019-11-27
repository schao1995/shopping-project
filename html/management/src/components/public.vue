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
  }
  .nav-bar {
    width: 100%;
    height: 60px;
    background-color: #14ddd6;
    position: fixed;
    left: 0;
    top: 0;
  }
  .content-model {
    width: 100%;
    min-height: 500px;
    padding-top: 60px;
    background-color: #f9f9f9;
  }
</style>
