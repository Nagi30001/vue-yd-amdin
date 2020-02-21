<template>
  <div>

    <el-tabs type="border-card" style="margin-top: 30px;margin: 30px;">
    <el-tab-pane label="销售类型">
      <el-button type="primary" size="small" plain style="margin: 5px;" icon="el-icon-circle-plus"
      @click="centerDialogVisible = true"
       >新增类型</el-button>
      <el-table
          size="mini"
          :data="sellTypes.filter(data => !search || data.sellType.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            label="ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="销售类型"
            prop="sellType">
          </el-table-column>
          <el-table-column
            label="应付金额"
            prop="money">
          </el-table-column>
          <el-table-column
            label="应付押金"
            type="double"
            prop="cashPledge">
          </el-table-column>
          <el-table-column
            label="说明"
            prop="explains">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改信息</el-button>
<!--              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
            </template>
          </el-table-column>
        </el-table>
    </el-tab-pane>
  </el-tabs>

  <!-- 新增销售类型弹出框 -->
  <el-dialog
    :title=" checkPattern ? '新增销售类型':'更新信息' "
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
    <span>需要注意的是内容是默认不居中的</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          sellTypes:[],
          search: '',
          centerDialogVisible: false,
          // true=update false=add
          checkPattern: false,
        }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        },
        // 初始化数据
        getData(){
          this.$store.dispatch('data/getSellType').then(res => {
            this.sellTypes = res.sellTypes
          })
        }
      },
      created() {
        this.getData()
      }
    }
</script>

<style>
</style>
