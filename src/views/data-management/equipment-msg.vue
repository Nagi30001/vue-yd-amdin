<template>
  <div>
    <el-tabs type="border-card" style="margin-top: 30px;margin: 30px;">
    <el-tab-pane label="销售类型">
      <el-button type="primary" size="small" plain style="margin: 5px;" icon="el-icon-circle-plus"
      @click="centerDialogVisible = true"
       >新增类型</el-button>
      <el-table
          size="mini"
          :data="equipmentMsgs.filter(data => !search || data.equipmentTypeNum.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column
            label="ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="设备品牌"
            prop="equipmentBrand">
          </el-table-column>
          <el-table-column
            label="设备型号"
            prop="equipmentTypeNum">
          </el-table-column>
          <el-table-column
            label="尺寸(寸)"
            type="double"
            prop="size">
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
    :title=" checkPattern ? '修改设备信息':'新增设备信息' "
    :visible.sync="centerDialogVisible"
    width="400px"
    center>
    <el-form :rules="rules" :model="equipmentMsg" ref="equipmentMsg">
      <el-form-item label="设备品牌:" prop="brand" label-width="90px">
        <!-- <el-input  placeholder="销售名称" v-model="equipmentMsg.brand" style="width: 200px; margin: 5px;" class="filter-item" /> -->
        <el-autocomplete
          style="width: 200px; margin: 5px;"
          class="inline-input"
          v-model="equipmentMsg.brand"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="型号:" prop="type" label-width="90px">
        <el-input  placeholder="请填写型号" v-model="equipmentMsg.type" style="width: 200px; margin: 5px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="尺寸:" prop="size" label-width="90px">
        <el-input  placeholder="请填写尺寸" v-model.number="equipmentMsg.size" style="width: 200px; margin: 5px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="状态:"  label-width="90px" v-if="checkPattern">
        <el-input  placeholder="销售名称" v-model="equipmentMsg.status" style="width: 200px; margin: 5px;" class="filter-item" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="clearEquipment()">取 消</el-button>
      <el-button type="primary" @click="checkEquipmentMsg()">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
  let checkSize = (rule, value, callback) => {
    if(!value){
       return callback(new Error('尺寸不能为空'))
    }
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字值'))
    }
    if (value > 15) {
      callback(new Error('必须小于15！'))
    } else {
      callback()
    }
  }

  export default {
      data() {
        return {
          // 设备信息集合
          equipmentMsgs:[],
          search: '',
          centerDialogVisible: false,
          // true=update false=add
          // trye= update false=add
          checkPattern: false,
          // 品牌字符串集合
          brand: [],
          // 新增/修改设备信息
          equipmentMsg: {
            brand: '',
            type: '',
            size: '',
            status: ''
          },
          // 尺寸验证
          checkSize,
          rules: {
            brand: [{ required: true, message: '请输入设备品牌', trigger: 'blur' }],
            type: [{ required: true, message: '请输入设备型号', trigger: 'blur' }],
            size: [{ validator:checkSize ,  trigger: 'blur' }],
          }
        }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        },
        // 新增/修改设备信息对话框取消
        clearEquipment(){
          this.centerDialogVisible = false
          this.$refs['equipmentMsg'].resetFields()
          this.remakeEquipmentMsg()
        },
        // 重制对话框里的信息
        remakeEquipmentMsg(){
          this.equipmentMsg =  {
            brand: '',
            type : '',
            size :'',
            status :''
          }
        },
        // 验证对话框信息
        checkEquipmentMsg(){
          this.$refs['equipmentMsg'].validate((valid) => {
            if(this.checkPattern){
              //修改提交
            } else {
              //新增提交
              this.addEquipment()
            }
          })
        },
        // 添加设备信息
        addEquipment(){
          //发送请求
          this.$store.dispatch('data/addEquipment',this.equipmentMsg).then(res => {
            this.equipmentMsgs.unshift(res.equipment)
            this.clearEquipment()
            this.$message({
              type:'success',
              message: '添加成功'
            })
          })

        },
        // 修改设备信息
        updateEquipment(){
          //发送请求

        },
        // 品牌输入匹配查询
        querySearch(queryString, cb) {
          var restaurants = this.brand
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
        // 初始化数据
        getData(){
          this.$store.dispatch('data/getEquipmentMsg').then(res => {
            this.equipmentMsgs = res.equipmentMsg
            // 将品牌集合赋值
            let brand = Array()
            this.equipmentMsgs.forEach(item => {
              brand.push(item.equipmentBrand)
            })
            brand = Array.from(new Set(brand))
            console.log(brand)
            brand.forEach(item => {
              this.brand.push({value:item})
            })
            console.log(this.brand)
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
