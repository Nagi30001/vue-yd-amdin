<template>
  <div>
  <el-tabs type="border-card" style="margin: 10px;">
    <el-button type="primary" plain size="small" style="margin: 5px;" icon="el-icon-circle-plus" @click="openDialog()">新增车型</el-button>
    <el-tab-pane label="车型管理">
      <el-table
          size="mini"
          :data="carTypeMsgs.filter(data => !search || data.subsidiary.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            label="ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="品牌"
            prop="brand">
          </el-table-column>
          <el-table-column
            label="型号"
            prop="subsidiary">
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status">
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
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-tab-pane>
  </el-tabs>
  <el-dialog
    :title="dialogType ? '修改信息' : '新增车型' "
    :visible.sync="centerDialogVisible"
    width="400px"
    >
    <el-form :model="carTypeMsg" :rules="rules" ref="carTypeMsg">
      <el-form-item label="品牌:" label-width="90px" prop="brand" >
        <el-autocomplete
          v-model="carTypeMsg.brand"
          :fetch-suggestions="querySearch"
          placeholder="请输入车辆品牌"
          @select="handleSelect"
          style="width: 200px;"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="车型:" label-width="90px" prop="subsidiary" >
        <el-input v-model="carTypeMsg.subsidiary"  placeholder="请输入车辆型号" style="width: 200px;"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="clearDialog()">取 消</el-button>
      <el-button type="primary" @click="checkCarTypeMsg()">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          // 车型数据
          carTypeMsgs:[],
          // 车型品牌
          carBrand: [],
          search: '',
          // 类型
          dialogType: false,
          centerDialogVisible: false,
          // 新增车型数据
          carTypeMsg:{
            id:'',
            brand: '',
            subsidiary:'',
            status: ''
          },
          rules:{
            brand: [{required: true, message: '请填写车型品牌！', trigger:'blur'}],
            subsidiary: [{required: true, message: '请填写车型型号！', trigger:'blur'}],
          }


        }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
        // 初始化数据
        getDate(){
          this.$store.dispatch('data/getCarTypeMsg').then(res => {
            let brand = Array()
            this.carTypeMsgs = res.carTypeMsg
            this.carTypeMsgs.forEach(item => {
              brand.push(item.brand)
            })
            brand = Array.from(new Set(brand))
            brand.forEach(item => {
              this.carBrand.push({value:item})
            })
          })
        },
        // 打开新增车型对话框
        openDialog(){
          this.centerDialogVisible = true
        },
        // 品牌输入匹配查询
        querySearch(queryString, cb) {
          var restaurants = this.carBrand
          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
          console.log(results)
          // 调用 callback 返回建议列表的数据
          cb(results)
        },
        createFilter(queryString) {
          console.log(queryString)
          return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          }
        },
        handleSelect(item) {
          console.log(item);
        },
        checkCarTypeMsg(){

          this.$refs['carTypeMsg'].validate((valid) => {
            if(valid) {
              if(this.dialogType){
                // 修改提交
                this.updateCarType()
              } else {
                // 添加提交
                this.addCarType()
              }
            }
          })
        },
        // 添加车型
        addCarType(){
          console.log(this.carTypeMsg)
          this.$store.dispatch('data/addCarType',this.carTypeMsg).then(res => {
            this.carTypeMsgs.unshift(res.carType)
            this.$message({
              type:'success',
              message: '添加车型成功'
            })
            this.clearDialog()
          })

        },
        // 更新车型信息
        updateCarType(){

        },
        // 取消对话框
        clearDialog(){
          // 重置数据
          this.resetCarTypeMsg()
          this.centerDialogVisible = false
          // 取消验证
          this.$refs['carTypeMsg'].resetFields()

        },
        // 数据对话框数据重置
        resetCarTypeMsg(){
          this.carTypeMsg = {
            id:'',
            brand: '',
            subsidiary:'',
            status: ''
          }
        }
      },
      created() {
        this.getDate()
      }
    }
</script>

<style>
</style>
