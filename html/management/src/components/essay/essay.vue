<template>
  <div class="essay">
    <ul class="essay-content">
      <li class="essay-content-list" v-for="(list, index) in essayList" :key="index">
        <div class="essay-content-list-title">
          <p>{{ list.title }}</p>
          <div class="essay-content-list-title-button">
            <el-button size="mini" type="primary" @click="preview(list.title)">预 览</el-button>
            <el-button size="mini" @click="editEssay(list.title, list.id)">编 辑</el-button>
          </div>
        </div>
        <div class="essay-content-list-detail">{{ list.explain }}</div>
      </li>
    </ul>
    <el-dialog title="预览" :visible.sync="dialogVisible">
      <div v-html="previewContent"></div>
    </el-dialog>
    <el-dialog title="编辑文章" :visible.sync="dialogFormVisible" @close="closeDialog">
      <div style="margin:0 5%; width: 90%;">
        <el-form label-position="left" :label-width="labelWidth">
          <el-form-item label="标题">
            <el-input size="mini" class="annotationInput" v-model="title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="说明">
            <el-input size="mini" v-model="explain" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <edit-module v-model="content"
                     :disabled="disabled"
                     @onClick="onClick"
                     @input="editors"
                     ref="editor"></edit-module>
        <el-form class="ann-form" label-position="left" :label-width="labelWidth" :model="annotation">
          <el-form-item label="单词">
            <el-input size="mini" class="annotationInput" v-model="annotation.input" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="添加注释">
            <el-input size="mini" class="annotationTextarea" v-model="annotation.area" type="textarea"></el-input>
            <el-button size="mini" type="primary" @click="addAnnotation">添 加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="changeEssay">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import editModule from '../edit-module/edit-module'
export default {
  name: 'essay',
  data () {
    return {
      essayList: [
        {
          title: '',
          id: 1,
          explain: ''
        }],
      labelWidth: '70px',
      annotation: {
        input: '',
        area: ''
      },
      title: '',
      oldTitle: '',
      id: -1,
      explain: '',
      dialogFormVisible: false,
      disabled: false,
      content: '', // 富文本编辑器双向绑定的内容
      dialogVisible: false,
      previewContent: ''
    }
  },
  components: { editModule },
  mounted () {
    this.selectEssay()
  },
  methods: {
    editors (content) { // editor组件传过来的值赋给content
      console.log(content)
      this.content = content
    },
    onClick (e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    closeDialog () {
      this.$refs.editor.clear()
    },
    addAnnotation () {
      let ann = this.annotation.input.replace(/(^\s*)|(\s*$)/g, '')
      if (ann === '') {
        console.log('为空')
        return
      }
      let reg = new RegExp('(.*)' + ann, 'g')
      this.content = this.content.replace(reg, ' $1<el-tooltip placement="top">\n' +
          '    <div slot="content">' + this.annotation.area + '</div>\n' +
          '    <el-button type="text">' + ann + '</el-button>\n' +
          '    </el-tooltip> ')
    },
    selectEssay () {
      this.$axios({
        method: 'post',
        url: '/api/essay',
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
    preview (title) {
      this.dialogVisible = true
      this.essayDetail(title)
    },
    editEssay (title, id) {
      this.dialogFormVisible = true
      this.id = id
      if (title) {
        this.oldTitle = title
        this.title = title
        this.essayDetail(title)
      }
    },
    essayDetail (title) {
      this.$axios({
        method: 'post',
        url: '/api/readEssay',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: this.$qs.stringify({
          title: title
        })
      }).then((response) => {
        console.log(response.data)
        if (response.data.code === 401) {
          this.$router.push({ path: '/' })
        } else if (response.data.code === -1) {
          this.$message.error(response.data.msg)
        } else {
          this.previewContent = response.data.data
          this.content = response.data.data
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    changeEssay () {
      this.$axios({
        method: 'post',
        url: '/api/changeEssay',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: this.$qs.stringify({
          title: this.title,
          oldTitle: this.oldTitle,
          id: this.id,
          explain: this.explain,
          content: this.content
        })
      }).then((response) => {
        console.log(response.data)
        if (response.data.code === 401) {
          this.$router.push({ path: '/' })
        } else if (response.data.code === -1) {
          this.$message.error(response.data.msg)
        } else {
          this.$message('添加成功')
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .essay {
    width: 1100px;
    margin: auto;
    background: rgba(249, 249, 249, .5);
  }
  .essay-content:after {
    content:"";
    height:0;
    line-height:0;
    display:block;
    visibility:hidden;
    clear:both;
  }
  .essay-content-list {
    float: left;
    width: 510px;
    padding: 10px;
    margin: 10px;
    line-height: 40px;
    background-color: rgba(249, 249, 249, .7);
  }
  .essay-content-list-title {
    height: 40px;
  }
  .essay-content-list p {
    font-size: 16px;
    float: left;
  }
  .essay-content-list-title-button {
    float: right;
  }
  .essay-content-list-detail {
    font-size: 14px;
    line-height: 30px;
    padding-left: 10px;
    width:500px;
    height:60px;/*需要展示行高度*/
    display: -webkit-box; /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
    -webkit-box-orient: vertical; /* 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
    text-overflow: ellipsis; /* 可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。*/
    -webkit-line-clamp: 2;
    overflow : hidden;
  }
  .annotationInput {
    width: 100px;
  }
  .annotationTextarea {
    width: 200px
  }
</style>
