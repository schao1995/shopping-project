<template>
  <div class="word-book">
    <!--<audio controls src="http://dict.youdao.com/dictvoice?audio=and&type=2"></audio>-->
    <div class="word-book-content">
      <div v-for="(wordsContent, key1) in wordsData" :key="key1" class="word-book-content-li">
        <p class="word-book-content-li-time">{{ wordsContent.time }}</p>
        <div v-for="(words, key2) in wordsContent.words" :key="key2" class="word-book-content-li-parent">
          <div class="word-book-content-li-words-word">{{ words.word }}</div>
          <ul class="word-book-content-li-words">
            <li v-if="words.soundmarkF[0]" class="word-book-content-li-words-soundmark">{{ words.soundmarkF[0] }}</li>
            <li v-if="words.soundmarkF[0]" class="word-book-content-li-words-soundmark">{{ words.soundmarkF[1] }}</li>
            <li v-if="words.soundmarkF[0]" style="height: 30px;overflow: hidden;margin-right: 40px" @mouseover="playAudio" class="word-book-content-li-words-soundmarkUrl">
              <audio :src="words.soundmarkF[2]"></audio>
            </li>
            <li v-if="words.soundmarkS[0]" class="word-book-content-li-words-soundmark">{{ words.soundmarkS[0] }}</li>
            <li v-if="words.soundmarkS[0]" class="word-book-content-li-words-soundmark">{{ words.soundmarkS[1] }}</li>
            <li v-if="words.soundmarkS[0]" style="height: 30px;overflow: hidden" @mouseover="playAudio" class="word-book-content-li-words-soundmarkUrl">
              <audio :src="words.soundmarkS[2]"></audio>
            </li>
          </ul>
          <div class="word-book-content-li-words-paraphrase">
            <ul class="word-book-content-li-words-paraphrase-ul">
              <li v-for="(paraphrase, key3) in words.paraphrase" :key="key3" class="word-book-content-li-words-paraphrase-li">{{ paraphrase }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-word">
      <el-button size="medium" type="primary" @click="dialogFormVisible = true">编辑</el-button>
    </div>
    <el-dialog title="编辑单词本" :visible.sync="dialogFormVisible" @close="clearInput">
      <el-tabs v-model="activeName" type="card" @tab-click="dialogFormVisible = true">
        <el-tab-pane label="添加" name="first">
          <el-form :model="addWord">
            <el-form-item label="新增单词" :label-width="formLabelWidth">
              <el-input v-model="addWord.word" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="appendWord">确 定</el-button>
        </el-tab-pane>
        <el-tab-pane label="修改" name="second">
          <el-form :model="addWord">
            <el-form-item label="修改单词" :label-width="formLabelWidth">
              <el-input v-model="addWord.word" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="修改结果" :label-width="formLabelWidth">
              <el-input v-model="addWord.word" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </el-tab-pane>
        <el-tab-pane label="删除" name="third">
          <el-form :model="addWord">
            <el-form-item label="删除单词" :label-width="formLabelWidth">
              <el-input v-model="addWord.word" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </el-tab-pane>
      </el-tabs>
      <!--<div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import POWERMODE from '../../../static/js/activate'
export default {
  name: 'word-book',
  data () {
    return {
      wordsData: [
        {
          time: '',
          words: [
            {
              id: '1',
              word: '',
              soundmarkF: [
                '',
                '',
                ''
              ],
              soundmarkS: [
                '',
                '',
                ''
              ],
              paraphrase: [
                '',
                ''
              ]
            }
          ]
        }
      ],
      activeName: 'first',
      dialogFormVisible: false,
      addWord: {
        word: ''
      },
      formLabelWidth: '80px'
    }
  },
  mounted () {
    /* let date = new Date()
    console.log(date.toLocaleDateString()) */
    let sw = window.screen.width
    if (sw > 1200) {
      POWERMODE.colorful = true
      POWERMODE.shake = false
      document.body.addEventListener('input', POWERMODE)
    }
    this.selectWord()
  },
  methods: {
    editWord: function () {
      console.log(1)
    },
    playAudio: function (e) { // 划过小喇叭播放mp3
      if (e.target.firstElementChild !== null) {
        if (e.target.firstElementChild.paused) { // 判断音乐是否在播放中，暂停状态
          e.target.firstElementChild.play() // 音乐播放
        } else { // 播放状态
          // e.target.firstElementChild.pause() // 音乐停止
        }
      }
    },
    selectWord: function () { // 查询单词
      console.log(localStorage.getItem('token'))
      this.$axios({
        method: 'post',
        url: '/api/word-book',
        headers: {
          'token': localStorage.getItem('token')
        }/* ,
      data: this.$qs.stringify({
        username: this.formLogin.loginName,
        password: this.formLogin.loginPass
      }) */
      }).then((response) => {
        console.log(response.data)
        if (response.data.code === 401) {
          this.$router.push({ path: '/' })
        }
        this.wordsData = response.data.data
      }).catch((error) => {
        console.log(error)
      })
    },
    appendWord: function () {
      let isOnlyAWord = this.addWord.word.indexOf(' ')
      if (isOnlyAWord > 0) {
        this.$message({
          message: '请确保输入内容为一个单词',
          type: 'warning'
        })
        return
      }
      this.$axios({
        method: 'post',
        url: '/api/appendWord',
        headers: {
          'token': localStorage.getItem('token')
        },
        data: this.$qs.stringify({
          word: this.addWord.word
        })
      }).then((response) => {
        console.log(response.data)
        if (response.data.code === 401) {
          this.$router.push({ path: '/' })
        } else if (response.data.code === -1) {
          this.$message.error(response.data.msg)
        }
        // this.selectWord()
      }).catch((error) => {
        console.log(error)
      })
    },
    clearInput: function () {
      this.addWord.word = ''
    }
  }

}
</script>

<style scoped>
  .word-book {
  }
  .word-book-content {
    width: 1100px;
    min-height: 500px;
    margin: auto;
    /*background: rgba(13, 11, 10, .5);*/
  }
  .edit-word {
    width: 1100px;
    margin: auto;
    padding: 10px;
  }
  .word-book-content-li {
    margin-bottom: 10px;
    background: rgba(249, 249, 249, .5);
  }
  .word-book-content-li-time {
    line-height: 30px;
    padding: 10px 0 0 20px;
  }
  .word-book-content-li-words-soundmark, .word-book-content-li-words-soundmarkUrl {
    float: left;
  }
  .word-book-content-li-words-paraphrase {
    padding-top: 20px;
  }
  /*.word-book-content-li-words {
    padding: 10px 20px;
    line-height: 30px;
  }
  .word-book-content-li-words {
    float: left;
  }*/
  .word-book-content-li-parent {
    margin: 10px 20px;
    padding: 5px 10px;
    min-width: 240px;
    background-color: rgba(249, 249, 249, .8);
    line-height: 30px;
    float: left;
  }
  .word-book-content-li-words:after{
    content:"";
    height:0;
    line-height:0;
    display:block;
    visibility:hidden;
    clear:both;
  }
  .word-book-content-li-words-word{
    font-weight: 900;
    font-size: 18px;
  }
  .word-book-content-li-words-word, .word-book-content-li-words-soundmark {
    padding-right: 10px;
  }
  .word-book-content-li:after{
    content:"";
    height:0;
    line-height:0;
    display:block;
    visibility:hidden;
    clear:both;
  }
  .word-book-content-li-words-paraphrase-li:after{
    content:"";
    height:0;
    line-height:0;
    display:block;
    visibility:hidden;
    clear:both;
  }
  .word-book-content-li-words-soundmarkUrl {
    width: 16px;
    height: 30px;
    background-image: url("../../../static/imgs/trumpet.png");
    background-position: center;
    background-size: 16px 16px;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .word-book-content-li-words-soundmarkUrl:first-child {
    margin-right: 40px;
  }
  .word-book-content-li-words-soundmarkUrl:hover {
    background-image: url("../../../static/imgs/trumpet-on.png");
  }
</style>
