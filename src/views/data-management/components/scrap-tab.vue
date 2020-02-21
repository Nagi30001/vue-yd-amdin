<!-- 设备报废 -->
<template>
  <div>
      <el-button type="primary" size="small" plain style="margin: 5px;" icon="el-icon-circle-plus"
       @click="centerDialogVisible = true"
        >设备采购</el-button>

    <el-table
        size="mini"
        :data="scrapMsg.filter(data => !search || data.count.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="平台名称"
          prop="count">
        </el-table-column>
        <el-table-column
          label="平台类型"
          prop="count">
        </el-table-column>
        <el-table-column
          label="省份"
          prop="count">
        </el-table-column>
        <el-table-column
          label="城市"
          prop="count">
        </el-table-column>
        <el-table-column
          label="品牌"
          prop="count">
        </el-table-column>
        <el-table-column
          label="型号"
          prop="count">
        </el-table-column>
        <el-table-column
          label="尺寸"
          prop="count">
        </el-table-column>
        <el-table-column
          label="数量"
          prop="count">
        </el-table-column>
        <el-table-column
          label="报废时间"
          prop="count">
        </el-table-column>
        <el-table-column
          width="200px"
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
  <!--        <template slot-scope="scope">
           <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改信息</el-button>
          </template> -->
        </el-table-column>
      </el-table>
      </div>
</template>

<script>
  export default {
    props:{
      scrapMsg:{
        type:Array
      }
    },
    data(){
      return{
        search: '',
      }
    }
  }
</script>

<style>
</style>
