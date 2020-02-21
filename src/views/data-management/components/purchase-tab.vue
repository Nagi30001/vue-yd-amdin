<!-- 设备采购 -->
<template>
  <div>
    <el-button type="primary" size="small" plain style="margin: 5px;" icon="el-icon-circle-plus"
     @click="openDialog()"
      >设备采购</el-button>

  <el-table
      size="mini"
      :data="purchaseMsgs.filter(data => !search || data.count.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="采购平台"
        prop="count">
      </el-table-column>
      <el-table-column
        label="收货平台"
        prop="count">
      </el-table-column>
      <el-table-column
        label="收货省份"
        prop="count">
      </el-table-column>
      <el-table-column
        label="收货城市"
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
        label="采购时间"
        prop="count">
      </el-table-column>
      <el-table-column
        label="收货时间"
        prop="count">
      </el-table-column>
      <el-table-column
        label="作废时间"
        prop="count">
      </el-table-column>
      <el-table-column
        label="状态"
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
    <el-dialog
      title="设备采购"
      :visible.sync="centerDialogVisible"
      width="400px"
      center>
      <el-form :model="purchaseMsg" res="purchaseMsg" :rules="rules">
        <el-form-item label="收货省份:" label-width="90px" prop="province">
          <el-select v-model="purchaseMsg.province" placeholder="请选择收货省份" @change="changeProvince()">
            <el-option
            v-for="item in province"
            :key="item.province"
            :lable="item.province"
            :value="item.province">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收货城市:" label-width="90px" prop="city">
          <el-select v-model="purchaseMsg.city" placeholder="请选择收货城市" @focus="getCitis()"  @change="clearPlatforms()">
            <el-option
            v-for="item in city"
            :key="item.city"
            :lable="item.city"
            :value="item.city">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收货平台:" label-width="90px" prop="consigneeUserId">
          <el-select v-model="purchaseMsg.consigneeUserId" placeholder="请选择收货平台" @focus="getPlatform()" >
            <el-option
            v-for="item in platforms"
            :key="item.id"
            :lable="item.userName"
            :value="item.userName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备品牌:" label-width="90px" prop="brand">
          <el-input placeholder="请填写型号" v-model="purchaseMsg.brand" width="194px" ></el-input>
        </el-form-item>
        <el-form-item label="设备型号:" label-width="90px" prop="type">
          <el-input placeholder="请填写型号" v-model="purchaseMsg.type" ></el-input>
        </el-form-item>
        <el-form-item label="设备尺寸:" label-width="90px" prop="size">
          <el-input placeholder="请填写型号" v-model.number="purchaseMsg.size" width="194px" ></el-input>
        </el-form-item>
        <el-form-item label="采购数量:" label-width="90px" prop="count" width="194px">
          <el-input placeholder="请填写型号" v-model.number="purchaseMsg.count"  ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
  export default {
    props:{
      // 采购单据
      purchaseMsgs: {
        type: Array
      },
      // 收货平台
      platform: {
        type: Array
      },
      // 设备品牌
      brand: {
        type: Array
      },
      // 设备型号
      type: {
        type: Array
      },
      // 省份
      province: {
        type: Array
      },
      // 城市
      citis: {
        type: Array
      }


    },
    data(){
      return{
        // 城市列表
        city: [],
        // 设备型号列表
        equipmentType: [],
        // 收货平台列表
        platforms: [],
        centerDialogVisible: false,
        search: '',
        // 新增采购信息
        purchaseMsg: {
          // 收货省份
          province: '',
          // 收货城市
          city: '',
          // 收货平台
          consigneeUserId:'',
          // 品牌
          brand: '',
          // 型号
          type: '',
          // 尺寸
          size: '',
          // 数量
          count: '',
        },
        rules: {
          province:[{required: true, message: '请选择收货省份！', trigger:'change'}],
          city:[{required: true, message: '请选择收货城市！', trigger:'change'}],
          consigneeUserId:[{required: true, message: '请选择收货平台！', trigger:'change'}],
          brand:[{required: true, message: '请选择设备品牌！', trigger:'change'}],
          type:[{required: true, message: '请选择设备型号！', trigger:'change'}],
          size:[
            {required: true, message: '请输入尺寸(数字)！', trigger:'change'},
            {type: 'number', message: '请输入数字！', trigger:'change'},
            ],
          count:[
            {required: true, message: '请输入数量！', trigger:'change'},
            {type: 'number', message: '请输入数字！', trigger:'change'},
            ]
        }
      }
    },
    methods:{
      // 打开对话框
      openDialog(){
        this.centerDialogVisible = true

      },
      // 城市获得焦点后获取城市信息
      getCitis(){
        //城市清空
        this.purchaseMsg.city = ''
        this.city = []
        console.log('第一步')
        let provinceId = ''
        this.province.forEach(item => {
          console.log('第二步')
          if(this.purchaseMsg.province == item.province){
            provinceId = item.id
          }
        })
        this.citis.forEach(item => {
          console.log('第三步')
          if(provinceId == item.provinceId){
            this.city.push(item)
          }
        })
        console.log(this.purchaseMsg.city)
      },
      // 省份发生改变时，执行
      changeProvince(){
        //城市清空
        this.purchaseMsg.city = ''
        this.city = []
        // 平台信息清空
        this.clearPlatforms()

      },
      // 平台获得焦点后执行
      getPlatform(){
        this.clearPlatforms()
        this.platform.forEach(item => {
          if(item.city == this.purchaseMsg.city){
            this.platforms.push(item)
          }
        })
      },
      // 城市变动清空平台信息
      clearPlatforms(){
        this.purchaseMsg.consigneeUserId = ''
        this.platforms = []
      },
      // 清空对话框数据
      remakePurchaseMsg(){
        this.purchaseMsg = {
          province: '',
          city: '',
          consigneeUserId:'',
          brand: '',
          type: '',
          size: '',
          count: '',
        }
      }
    }
  }
</script>

<style>
</style>
