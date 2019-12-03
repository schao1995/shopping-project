<template>
  <div class="essay">
    <ul class="essay-content">
      <li class="essay-content-list" v-for="(list, index) in essayList" :key="index">
        <div class="essay-content-list-title">
          <p>{{ list.title }}</p>
          <div class="essay-content-list-title-button">
            <el-button size="mini" type="primary" @click="dialogFormVisible = false">预 览</el-button>
            <el-button size="mini" @click="dialogFormVisible = true">编 辑</el-button>
          </div>
        </div>
        <div class="essay-content-list-detail">{{ list.detail}}</div>
      </li>
    </ul>
    <el-dialog title="编辑文章" :visible.sync="dialogFormVisible">
      <edit-module/>
      <!--<div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>-->
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
          title: 'js',
          essayId: '1',
          detail: 'wewew ewewe wewewe wewewewewe wew ewewe wewe wewe wewewe wewe wewewewewew ewewewewewe wewewewewew ewewewewewe wewewewewew ewewewewewe wewewewewew ewewewewewe wewewewewewew ewewewewewewe wewewewewewewewewe wewewewewewewewewewew ewewewewewewew ewewewewewewewe wewewewewewe wewewewewewewewewewewew ewewewewe wewewewewe'
        }, {
          title: 'js',
          essayId: '2',
          detail: 'we'
        }, {
          title: 'js',
          essayId: '3',
          detail: 'we'
        }
      ],
      dialogFormVisible: true
    }
  },
  components: { editModule }
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
</style>
