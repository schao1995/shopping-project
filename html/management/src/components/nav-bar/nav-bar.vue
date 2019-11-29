<template>
  <div class="nav-bar">
    <!--<el-menu
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
    </el-menu>-->
    <ul class="nav-bar-list">
      <li class="nav-bar-list-canvas"><caterpillar @isChange="isChange" :caterpillarData="caterpillarData"/></li>
      <li v-for="(detail, index) in list" :key="index" @click="skip(index)" :class="[ index === activeIndex && isChangeOver ? 'nav-bar-list-choose nav-bar-list-skip' : 'nav-bar-list-skip' ]">{{ detail }}</li>
    </ul>
  </div>
</template>

<script>
import caterpillar from '../caterpillar/caterpillar.vue'
export default {
  name: 'navBar',
  data () {
    return {
      list: ['单词本', '文章', '画', '个人中心', '日志'],
      activeIndex: 0,
      isChangeOver: true,
      urlSrc: ['word-book', 'essay', 'painting', 'user-manage', 'log'],
      pathUrl: '/public/content/',
      caterpillarData: {
        width: 1100, // canvas宽
        height: 60, // canvas高
        lineWidth: 100, // 线长
        startPosition: 100, // 头起始位置
        endPosition: 0, // 尾起始位置
        direction: 1, // 方向
        x: 100, // 曲线中心顶点x轴
        y: 59, // 曲线中心顶点y轴
        headMove: 0, // 虫头移动距离
        tailMove: 0, // 虫尾移动距离
        headLength: 20, // 头长
        isStretch: false, // 弯曲，还是伸直
        isLimit: false, // 是否触碰临界点
        isDraw: false, // 是否显示canvas
        headStopPosition: -1,
        tailStopPosition: -1,
        crawlX: 59, // 爬行水平线
        isStop: 0 // 是否停止
      }
    }
  },
  components: { caterpillar },
  mounted () {
    let url = window.location.href
    // this.activeIndex = '4'
    for (var i = 0; i < this.urlSrc.length; i++) {
      if (url.indexOf(this.urlSrc[i]) === -1) {
        continue
      } else if (url.indexOf(this.urlSrc[i]) >= 0) {
        this.activeIndex = i
      }
    }
  },
  methods: {
    /* handleSelect (key, keyPath) {
      console.log(key, keyPath)
      let url = window.location.href
      if (url.indexOf(this.urlSrc[key]) === -1) {
        this.$router.push({ path: (this.pathUrl + this.urlSrc[key]) })
      } else {
        console.log('当前页面')
      }
    }, */
    skip (index) {
      // console.log(index)
      let url = window.location.href
      if (url.indexOf(this.urlSrc[index]) === -1) {
        this.caterpillarData.isDraw = true
        this.isChangeOver = false
        this.$router.push({ path: (this.pathUrl + this.urlSrc[index]) })
        if (this.activeIndex > index) {
          this.caterpillarData.direction = -1
          this.caterpillarData.tailStopPosition = this.caterpillarData.lineWidth * (index + 1)
          this.caterpillarData.headStopPosition = this.caterpillarData.lineWidth * (index)
        } else if (this.activeIndex < index) {
          this.caterpillarData.direction = 1
          this.caterpillarData.tailStopPosition = this.caterpillarData.lineWidth * (index)
          this.caterpillarData.headStopPosition = this.caterpillarData.lineWidth * (index + 1)
        }
        this.initCanvas()
        this.activeIndex = index
      } else {
        console.log('当前页面')
      }
    },
    initCanvas () {
      if (this.caterpillarData.direction > 0) {
        this.caterpillarData.startPosition = (this.activeIndex + 1) * this.caterpillarData.lineWidth
        this.caterpillarData.endPosition = (this.activeIndex) * this.caterpillarData.lineWidth
      } else if (this.caterpillarData.direction < 0) {
        this.caterpillarData.startPosition = (this.activeIndex + 1) * this.caterpillarData.lineWidth
        this.caterpillarData.endPosition = (this.activeIndex) * this.caterpillarData.lineWidth
        // console.log(this.caterpillarData.startPosition)
        // console.log(this.caterpillarData.endPosition)
      }
      this.caterpillarData.x = ((this.activeIndex) * this.caterpillarData.lineWidth) + (this.caterpillarData.lineWidth / 2)
    },
    isChange () {
      this.isChangeOver = true
      console.log('触发')
    }
  }
}
</script>

<style scoped>
  /*.nav-bar {
    back
  }*/
  /*.el-menu{
    width: 1100px;
    margin: auto;
  }
  .el-menu.el-menu--horizontal {
    border: 0;
  }
  .el-menu-item {
    width: 100px;
    text-align: center;
    padding: 0;
  }
  .el-menu-item:hover {
    background-color: #ecf5ff;
  }*/
  .nav-bar-list:after {
    content:"";
    height:0;
    line-height:0;
    display:block;
    visibility:hidden;
    clear:both;
  }
  .nav-bar-list {
    width: 1100px;
    height: 60px;
    margin: auto;
    background-color: transparent;
    font-size: 14px;
    position: relative;
  }
  .nav-bar-list-canvas {
    display: block;
    height: 60px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 8;
  }
  .nav-bar-list-skip {
    width: 100px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    padding: 0;
    float: left;
    z-index: 10;
    box-sizing: border-box;
  }
  .nav-bar-list-skip:hover {
    background-color: rgba(236, 245, 255, .8);
    cursor: pointer;
  }
  .nav-bar-list-choose {
    color: #ffd04b;
    border-bottom: 2px solid #ffd04b;
  }
</style>
