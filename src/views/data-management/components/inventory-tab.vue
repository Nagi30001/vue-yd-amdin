<!-- 设备库存 -->
<template>
  <div>
  <el-button type="primary" size="small" plain style="margin: 5px;" icon="el-icon-circle-plus"
   @click="centerDialogVisible = true"
    >新增库存</el-button>
  <el-table
      size="mini"
      :data="informationMsg.filter(data => !search || data.equipmentMsg.equipmentBrand.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="型号ID"
        prop="equipmentMsgId">
      </el-table-column>
      <el-table-column
        label="平台名称"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        label="平台类型"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        label="省份"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        label="城市"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        label="品牌"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        label="型号"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        label="尺寸"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        label="总库存"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        label="可用库存"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        label="待维修"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        label="维修中"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        label="待接收"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        label="转移中"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        label="采购中"
        prop="user.userName">
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
      </el-table-column>
    </el-table>
   </div> 
</template>

<script>
  export default {
    props:{
      informationMsg:{
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
