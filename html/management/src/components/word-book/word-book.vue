<template>
  <div class="word-book">
    <div class="word-book-content">
      <div v-for="(wordsContent, key1) in wordsData" :key="key1" class="word-book-content-li">
        <p class="word-book-content-li-time">{{ wordsContent.time }}</p>
        <ul v-for="(words, key2) in wordsContent.words" :key="key2" class="word-book-content-li-words">
          <li class="word-book-content-li-words-word">{{ words.word }}</li>
          <li class="word-book-content-li-words-soundmark">{{ words.soundmark }}</li>
          <li class="word-book-content-li-words-soundmarkUrl">{{ words.soundmarkUrl }}</li>
          <li class="word-book-content-li-words-paraphrase">
            <ul class="word-book-content-li-words-paraphrase-ul">
              <li v-for="(paraphrase, key3) in words.paraphrase" :key="key3" class="word-book-content-li-words-paraphrase-li">
                <div class="word-book-content-li-words-paraphrase-li-pos">{{ paraphrase.pos }}</div>
                <ul class="word-book-content-li-words-paraphrase-li-content">
                  <li v-for="(paraphraseContent, key4) in paraphrase.content" :key="key4">{{ paraphraseContent }}<span v-show="key4 !== paraphrase.content.length - 1">;</span></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'word-book',
  data: function () {
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
      ]
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
    background: #14ddd6;
  }
  .word-book-content-li {
    padding-top: 30px;
  }
  .word-book-content-li-time {
    line-height: 30px;
  }
  .word-book-content-li-words {
    float: left;
  }
</style>
