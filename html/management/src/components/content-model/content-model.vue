<template>
    <div>
      <div class="content-model-router"><router-view/></div>
    </div>
</template>

<script>
export default {
  name: 'content-model'
}
</script>

<style scoped>
  .content-model-router {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 15px;
  }
</style>
