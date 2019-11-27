<template>
  <div class="nav-bar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#14ddd6"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0">单词本</el-menu-item>
      <el-menu-item index="1">文章</el-menu-item>
      <el-menu-item index="2">画</el-menu-item>
      <el-menu-item index="3">个人中心</el-menu-item>
      <el-menu-item index="4">日志</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data () {
    return {
      activeIndex: '0',
      urlSrc: ['word-book', 'essay', 'painting', 'user-manage', 'log'],
      pathUrl: '/public/content/'
    }
  },
  mounted () {
    let url = window.location.href
    this.activeIndex = '4'
    for (var i = 0; i < this.urlSrc.length; i++) {
      if (url.indexOf(this.urlSrc[i]) === -1) {
        continue
      } else if (url.indexOf(this.urlSrc[i]) >= 0) {
        this.activeIndex = i.toString()
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      let url = window.location.href
      if (url.indexOf(this.urlSrc[key]) === -1) {
        this.$router.push({ path: (this.pathUrl + this.urlSrc[key]) })
      } else {
        console.log('当前页面')
      }
    }
  }
}
</script>

<style scoped>
  /*.nav-bar {
    back
  }*/
  .el-menu{
    width: 1100px;
    margin: auto;
  }
  .el-menu.el-menu--horizontal {
    border: 0;
  }
</style>
