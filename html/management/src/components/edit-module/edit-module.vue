<template>
    <div class="edit-module">
      <!-- 工具栏 -->
      <div class="edit-module-tool"></div>
      <!-- div模拟文本域 -->
      <div ref="editDiv" class="edit-module-div" v-html="editContent" @input="handleInput" @focus="editFocus" @blur="lock=false" contenteditable="true"></div>
      <p>{{ editContent }}</p>
    </div>
</template>

<script>
export default {
  name: 'edit-module',
  data () {
    return {
      editContent: '',
      lock: false
    }
  },
  watch: {
    editContent: {
      handler (newValue, oldValue) {
        console.log(1)
        this.$nextTick(() => {
          this.keepLastIndex(this.$refs.editDiv)
        })
      },
      deep: true
    }
  },
  mounted () {
    this.$refs.editDiv.focus()
  },
  methods: {
    handleInput (e) {
      // console.log(this.$el)
      this.editContent = this.$refs.editDiv.innerHTML
    },
    editFocus () {
      if (this.$refs.editDiv.innerHTML === '' || this.$refs.editDiv.innerHTML === null) {
        this.editContent = '<div><br/></div>'
        this.keepLastIndex(this.$refs.editDiv)
      }
    },
    keepLastIndex (obj) {
      if (window.getSelection) {
        // ie11 10 9 ff safari
        obj.focus() // 解决ff不获取焦点无法定位问题
        let range = window.getSelection() // 创建range
        range.selectAllChildren(obj) // range 选择obj下所有子内容
        range.collapseToEnd() // 光标移至最后
        console.log(range)
        console.log(range.collapseToEnd())
        console.log(range.anchorNode)
      } else if (document.selection) {
        // ie10 9 8 7 6 5
        let range = document.selection.createRange() // 创建选择对象
        // var range = document.body.createTextRange();
        range.moveToElementText(obj) // range定位到obj
        range.collapse(false) // 光标移至最后
        range.select()
      }
    }
  }

}
</script>

<style scoped>

  .edit-module-div{
    border:1px solid #a0b3d6;
    width: 550px;
    min-height: 200px;
    font-size: 14px;
    padding: 4px;
    color: #333;
    outline:0; /* 解决聚焦边框 */
  }

  /* 添加placeholder属性 */
  .edit-module-div:empty::before{
    content:attr(placeholder);
    color: #999;
  }
</style>
