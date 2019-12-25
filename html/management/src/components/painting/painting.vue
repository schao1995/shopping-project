<template>
  <div class="painting">
    <ul class="printing-list">
      <li v-for="(printing, key) in printingData" :key="key" class="print-list-detail">
        <p class="print-list-detail-title">{{ printing.time }}</p>
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
    <div class="addPainting">
      <el-button size="mini" type="primary" @click="showDialog">添 加</el-button>
    </div>
    <el-dialog :visible.sync="uploadDialogVisible">
      <!--<el-upload
        action="#"
        list-type="picture-card"
        :on-change="handleChange"
        :auto-upload="false">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
          <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)"><i class="el-icon-zoom-in"></i></span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)"><i class="el-icon-delete"></i></span>
        </span>
        </div>
      </el-upload>-->
      <el-upload
        class="upload-demo"
        ref="upload"
        action="#"
        :before-upload="beforeUpload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'painting',
  data () {
    return {
      printingData: [{
        time: '',
        artistImage: '',
        freehandImage: '',
        srcList: [
          '',
          ''
        ]
      }],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      uploadDialogVisible: true,
      fileList: []
    }
  },
  mounted () {
    this.selectPainting()
  },
  methods: {
    selectPainting () {
      this.$axios({
        method: 'post',
        url: '/api/selectPainting',
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
          this.printingData = response.data.data
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    addPainting (fd) {
      this.$axios({
        method: 'post',
        url: '/api/appendPainting',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: this.$qs.stringify(fd)/* ,
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
          // this.essayList = response.data.data
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    beforeUpload (file) {
      console.log(file)
      let fd = new FormData()
      fd.append('key', file, 'fileName')
      this.addPainting(fd)
      return false // 返回false不会自动上传
    },
    showDialog () {
      this.uploadDialogVisible = true
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    },
    handleChange (file, fileList) {
      console.log('load')
      this.fileList = fileList.slice(-3)
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
    line-height: 210px;
  }
  .print-list-detail-set-msg {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }
  .addPainting {
    padding: 10px;
    background-color: rgba(249, 249, 249, .5);
  }
</style>
