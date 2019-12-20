<template>
  <div class="painting">
    <ul class="printing-list">
      <li v-for="(printing, key) in printingData" :key="key" class="print-list-detail">
        <p class="print-list-detail-title">{{ printing.date }}</p>
        <ul class="print-list-detail-set">
          <li class="print-list-detail-set-artist">
            <div class="print-list-detail-set-img">
              <el-image
                class="print-list-detail-set-el-img"
                :src="printing.artistImage"
                fit="scale-down"
                :preview-src-list="printing.srcList">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="print-list-detail-set-msg">原画</div>
          </li>
          <li class="print-list-detail-set-freehand">
            <div class="print-list-detail-set-img">
              <el-image
                class="print-list-detail-set-el-img"
                :src="printing.freehandImage"
                fit="scale-down"
                :preview-src-list="printing.srcList">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="print-list-detail-set-msg">手绘</div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'painting',
  data () {
    return {
      printingData: [{
        date: '19-11-11',
        artistImage: '../../../static/imgs/bg.jpg',
        freehandImage: '../../../static/imgs/bg.jpg',
        srcList: [
          '../../../static/imgs/bg.jpg',
          '../../../static/imgs/bg1.jpg'
        ]
      }]
    }
  },
  mounted () {
    this.selectPaintings()
  },
  methods: {
    selectPaintings () {
      this.$axios({
        method: 'post',
        url: '/api/selectPaintings',
        headers: {
          'token': localStorage.getItem('token')
        }/* ,
        data: this.$qs.stringify({
          word: this.addWord.word
        }) */
      }).then((response) => {
        console.log(response.data)
        if (response.data.code === 401) {
          this.$router.push({ path: '/' })
        } else if (response.data.code === -1) {
          this.$message.error(response.data.msg)
        } else {
          this.essayList = response.data.data
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    addPaintings () {
      this.$axios({
        method: 'post',
        url: '/api/addPaintings',
        headers: {
          'token': localStorage.getItem('token')
        }/* ,
        data: this.$qs.stringify({
          word: this.addWord.word
        }) */
      }).then((response) => {
        console.log(response.data)
        if (response.data.code === 401) {
          this.$router.push({ path: '/' })
        } else if (response.data.code === -1) {
          this.$message.error(response.data.msg)
        } else {
          this.essayList = response.data.data
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .painting {
    width: 1100px;
    margin: auto;
  }
  .printing-list {
    background-color: rgba(249, 249, 249, .5);
    padding: 25px 50px;
  }
  ul:after{
    content:"";
    height:0;
    line-height:0;
    display:block;
    visibility:hidden;
    clear:both;
  }
  li {
    float: left;
  }
  .print-list-detail {
    background-color: rgba(249, 249, 249, .8);
    width: 480px;
    height: 270px;
    margin: 10px;
    padding: 10px 0;
  }
  .print-list-detail-title {
    line-height: 30px;
    text-align: center;
  }
  .print-list-detail-set-artist, .print-list-detail-set-freehand {
    width: 210px;
    padding: 0 15px;
    text-align: center;
  }
  .print-list-detail-set-img {
    width: 100%;
    height: 210px;
    position: relative;
  }
  .print-list-detail-set-el-img {
    height: 210px;
  }
  .print-list-detail-set-msg {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }
</style>
