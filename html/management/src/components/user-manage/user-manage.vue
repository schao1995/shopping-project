<template>
  <div class="user-manage">
    <p class="user-manege-title">用户信息变更记录</p>
    <table-module :tableColumn="tableColumn" :tableData="tableData"/>
  </div>
</template>

<script>
import tableModule from '../table-module/table-module'
export default {
  name: 'user-manage',
  data () {
    return {
      tableColumn: [{
        width: '',
        label: '用户名',
        prop: 'date'
      }, {
        width: '',
        label: '操作',
        prop: 'name'
      }, {
        width: '',
        label: '更改时间',
        prop: 'address'
      }],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  components: { tableModule }
}
</script>

<style scoped>
  .user-manage {
    width: 1100px;
    height: 500px;
    margin: auto;
    padding: 20px;
    background-color: rgba(249, 249, 249, .8);
  }
  .user-manege-title {
    padding: 10px;
    line-height: 30px;
  }
</style>
