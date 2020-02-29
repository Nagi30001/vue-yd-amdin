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
        align="center"
        label="型号ID"
        prop="equipmentMsgId">
      </el-table-column>
      <el-table-column
        align="center"
        label="平台名称"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        align="center"
        label="平台类型"
        prop="user.userName">
      </el-table-column>
      <el-table-column
        align="center"
        label="省份"
        prop="user.province">
      </el-table-column>
      <el-table-column
        align="center"
        label="城市"
        prop="user.city">
      </el-table-column>
      <el-table-column
        align="center"
        label="品牌"
        prop="equipmentMsg.equipmentBrand">
      </el-table-column>
      <el-table-column
        align="center"
        label="型号"
        prop="equipmentMsg.equipmentTypeNum">
      </el-table-column>
      <el-table-column
        align="center"
        label="尺寸"
        prop="equipmentMsg.size">
      </el-table-column>
      <el-table-column
        align="center"
        label="总库存">
        <template slot-scope="scope">
          <span>{{getSum(scope.row)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="可用库存"
        prop="awaitInstall">
      </el-table-column>
      <el-table-column
        align="center"
        label="维修中"
        prop="inMaintain">
      </el-table-column>
      <el-table-column
        align="center"
        label="待接收"
        prop="awaitReceive">
      </el-table-column>
      <el-table-column
        align="center"
        label="转移中"
        prop="inInventory">
      </el-table-column>
      <el-table-column
        align="center"
        label="采购中"
        prop="inPurchase">
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
    },
    methods:{
      // 计算总库存
      getSum(row) {
        return row.inPurchase + row.awaitReceive + row.inMaintain + row.awaitInstall
      }
    }
  }
</script>

<style>
</style>
