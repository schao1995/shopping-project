<template>
  <canvas v-if="isDraw" :width="caterpillarData.width" :height="caterpillarData.height" id="canvas"></canvas>
</template>

<script>
export default {
  name: 'caterpillar',
  props: ['caterpillarData'],
  data () {
    return {
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
      isStop: 0
    }
  },
  mounted () {
    console.log(this.caterpillarData)
  },
  watch: {
    caterpillarData: {
      deep: true,
      handler: function () {
        console.log('监听')
        this.width = this.caterpillarData.width
        this.height = this.caterpillarData.height
        this.lineWidth = this.caterpillarData.lineWidth
        this.startPosition = this.caterpillarData.startPosition
        this.endPosition = this.caterpillarData.endPosition
        this.direction = this.caterpillarData.direction
        this.x = this.caterpillarData.x
        this.y = this.caterpillarData.y
        this.headMove = this.caterpillarData.headMove
        this.tailMove = this.caterpillarData.tailMove
        this.headLength = this.caterpillarData.headLength
        this.isStretch = this.caterpillarData.isStretch
        this.isLimit = this.caterpillarData.isLimit
        this.isDraw = this.caterpillarData.isDraw
        this.headStopPosition = this.caterpillarData.headStopPosition
        this.tailStopPosition = this.caterpillarData.tailStopPosition
        this.crawlX = this.caterpillarData.crawlX
        this.init()
      }

    }
  },
  /* updated: function () {
    this.$nextTick(function () {
      console.log('init')
      this.init()
    })
  }, */
  methods: {
    draw () {
      const canvas = document.getElementById('canvas')
      if (!canvas.getContext) return
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, this.width, this.height) // clear canvas

      if (this.isStretch) {
        // console.log(this.endPosition)
        // console.log(this.startPosition)
        if (this.direction > 0) {
          this.headMove += (3 * this.direction)
          this.x = (this.startPosition + this.headMove + this.endPosition) / 2
        } else if (this.direction < 0) {
          this.tailMove += (3 * this.direction)
          this.x = (this.tailMove + this.startPosition + this.endPosition) / 2
        }
        this.y += 2
        if (this.y > this.crawlX) {
          this.y = this.crawlX
          this.isStretch = !this.isStretch
          this.isLimit = true
        }
      } else {
        if (this.direction > 0) {
          this.tailMove += (3 * this.direction)
          this.x = (this.tailMove + this.startPosition + this.endPosition) / 2
        } else if (this.direction < 0) {
          this.headMove += (3 * this.direction)
          this.x = (this.startPosition + this.headMove + this.endPosition) / 2
        }
        this.y -= 2
        if (this.direction > 0 && this.x > (this.startPosition - this.lineWidth / 4)) {
          this.isStretch = !this.isStretch
          this.isLimit = true
        } else if (this.direction < 0 && this.x < (this.endPosition + this.lineWidth / 4)) {
          // alert(this.x)
          this.isStretch = !this.isStretch
          this.isLimit = true
        }
      }
      if (this.isStop > 0) {
        console.log((this.x + this.endPosition + this.tailMove + this.headLength) / 2)
        console.log(this.x)
        console.log((this.startPosition - this.headLength + this.headMove + this.x) / 2)
      }

      ctx.beginPath()
      ctx.strokeStyle = '#ffd04b'
      ctx.lineWidth = 2
      ctx.moveTo((this.endPosition + this.tailMove), this.crawlX)
      ctx.lineTo((this.endPosition + this.tailMove + this.headLength), this.crawlX)
      ctx.bezierCurveTo((this.x + this.endPosition + this.tailMove + this.headLength) / 2, this.crawlX, (this.x + this.endPosition + this.tailMove + this.headLength) / 2, this.y, this.x, this.y)
      ctx.bezierCurveTo((this.startPosition - this.headLength + this.headMove + this.x) / 2, this.y, (this.startPosition - this.headLength + this.headMove + this.x) / 2, this.crawlX, (this.startPosition - this.headLength + this.headMove), this.crawlX)
      ctx.lineTo(this.startPosition + this.headMove, this.crawlX)
      ctx.stroke()
      if (this.isLimit) {
        console.log(this.isStop)
        if (this.isStop > 0) {
          console.log('stop')
          this.isDraw = false
          this.isStop = 0
          this.$emit('isChange')
          return
        }
        /* if (this.isStop === 2) {
          console.log('stop')
          this.isDraw = false
          this.isStop = 0
          this.$emit('isChange')
          return
        }
        if (this.direction > 0 && this.tailStopPosition < this.x) {
          this.isStop += 1
        } else if (this.direction < 0 && this.tailStopPosition > this.x) {
          this.isStop += 1
        } */
        this.isLimit = false
        this.startPosition = this.startPosition + this.headMove
        this.endPosition = this.endPosition + this.tailMove
        /* console.log('-------')
        console.log(this.startPosition)
        console.log(this.endPosition) */
        this.headMove = 0
        this.tailMove = 0
      }

      if (this.direction > 0 && this.tailStopPosition <= this.endPosition + this.tailMove) {
        this.lastDraw()
      } else if (this.direction < 0 && this.tailStopPosition >= this.startPosition + this.headMove) {
        this.lastDraw()
      }

      window.requestAnimationFrame(this.draw)
    },
    init () {
      window.requestAnimationFrame(this.draw)
    },
    lastDraw () {
      this.isStop += 1
      this.isStretch = true
      this.startPosition = this.startPosition + this.headMove
      this.endPosition = this.endPosition + this.tailMove
      this.headMove = 0
      this.tailMove = 0
    }
  }
}
</script>

<style scoped>
  #canvas {
    z-index: 8;
  }
</style>
