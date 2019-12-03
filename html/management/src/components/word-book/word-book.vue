<template>
  <div class="word-book">
    <div class="word-book-content">
      <div v-for="(wordsContent, key1) in wordsData" :key="key1" class="word-book-content-li">
        <p class="word-book-content-li-time">{{ wordsContent.time }}</p>
        <ul v-for="(words, key2) in wordsContent.words" :key="key2" class="word-book-content-li-words">
          <li class="word-book-content-li-words-word">{{ words.word }}</li>
          <li class="word-book-content-li-words-soundmark">{{ words.soundmark }}</li>
          <li style="height: 30px;overflow: hidden" class="word-book-content-li-words-soundmarkUrl">{{ words.soundmarkUrl }}</li>
          <li class="word-book-content-li-words-paraphrase">
            <ul class="word-book-content-li-words-paraphrase-ul">
              <li v-for="(paraphrase, key3) in words.paraphrase" :key="key3" class="word-book-content-li-words-paraphrase-li">
                <div class="word-book-content-li-words-paraphrase-li-pos">{{ paraphrase.pos }}.</div>
                <div class="word-book-content-li-words-paraphrase-li-content">
                  <span v-for="(paraphraseContent, key4) in paraphrase.content" :key="key4">{{ paraphraseContent }}<span style="padding-right: 5px" v-show="key4 !== paraphrase.content.length - 1">;</span></span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="edit-word">
      <el-button size="medium" type="primary" @click="dialogFormVisible = true">编辑</el-button>
    </div>
    <el-dialog title="编辑单词本" :visible.sync="dialogFormVisible">
      <el-tabs v-model="activeName" type="card" @tab-click="dialogFormVisible = true">
        <el-tab-pane label="添加" name="first">
          <el-form :model="form">
            <el-form-item label="新增单词" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </el-tab-pane>
        <el-tab-pane label="修改" name="second">
          <el-form :model="form">
            <el-form-item label="修改单词" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="修改结果" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </el-tab-pane>
        <el-tab-pane label="删除" name="third">
          <el-form :model="form">
            <el-form-item label="删除单词" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
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
// import POWERMODE from '../../../static/js/activate'
export default {
  name: 'word-book',
  data () {
    return {
      wordsData: [
        {
          time: '2019-11-11',
          words: [
            {
              word: 'a',
              soundmark: '/eɪ/',
              soundmarkUrl: '',
              paraphrase: [{
                pos: 'art',
                content: ['一', '任一', '每一']
              }]
            }, {
              word: 'a',
              soundmark: '/eɪ/',
              soundmarkUrl: '',
              paraphrase: [{
                pos: 'art',
                content: ['一', '任一', '每一']
              }]
            }, {
              word: 'a',
              soundmark: '/eɪ/',
              soundmarkUrl: '',
              paraphrase: [{
                pos: 'art',
                content: ['一', '任一', '每一']
              }]
            }
          ]
        }, {
          time: '2019-11-11',
          words: [
            {
              word: 'a',
              soundmark: '/eɪ/',
              soundmarkUrl: '',
              paraphrase: [{
                pos: 'art',
                content: ['一', '任一', '每一']
              }]
            }, {
              word: 'a',
              soundmark: '/eɪ/',
              soundmarkUrl: '',
              paraphrase: [{
                pos: 'art',
                content: ['一', '任一', '每一']
              }]
            }, {
              word: 'a',
              soundmark: '/eɪ/',
              soundmarkUrl: '',
              paraphrase: [{
                pos: 'art',
                content: ['一', '任一', '每一']
              }]
            }
          ]
        }, {
          time: '2019-11-11',
          words: [
            {
              word: 'a',
              soundmark: '/eɪ/',
              soundmarkUrl: '',
              paraphrase: [{
                pos: 'art',
                content: ['一', '任一', '每一']
              }]
            }, {
              word: 'a',
              soundmark: '/eɪ/',
              soundmarkUrl: '',
              paraphrase: [{
                pos: 'art',
                content: ['一', '任一', '每一']
              }]
            }, {
              word: 'a',
              soundmark: '/eɪ/',
              soundmarkUrl: '',
              paraphrase: [{
                pos: 'art',
                content: ['一', '任一', '每一']
              }]
            }
          ]
        }
      ],
      activeName: 'first',
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '80px'
    }
  },
  mounted () {
  },
  methods: {
    editWord: function () {
      console.log(1)
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
  .word-book-content-li-words-word, .word-book-content-li-words-soundmark, .word-book-content-li-words-soundmarkUrl {
    float: left;
  }
  .word-book-content-li-words-paraphrase {
    padding-top: 30px;
  }
  .word-book-content-li-words {
    padding: 10px 20px;
    line-height: 30px;
  }
  .word-book-content-li-words:after{
    content:"";
    height:0;
    line-height:0;
    display:block;
    visibility:hidden;
    clear:both;
  }
  .word-book-content-li-words-word, .word-book-content-li-words-soundmark {
    padding-right: 10px;
  }
  .word-book-content-li-words-paraphrase-li-pos {
    padding-right: 5px;
  }
  .word-book-content-li-words {
    float: left;
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
  .word-book-content-li-words-paraphrase-li-pos, .word-book-content-li-words-paraphrase-li-content {
    float: left;
  }
  .word-book-content-li-words-paraphrase-li-content {
    max-width: 300px;
    letter-spacing: 3px;
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
  .word-book-content-li-words-soundmarkUrl:hover {
    background-image: url("../../../static/imgs/trumpet-on.png");
  }
</style>
