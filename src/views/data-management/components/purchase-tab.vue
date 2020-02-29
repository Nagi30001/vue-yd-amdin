<!-- 设备采购 -->
<template>
  <div>
    <el-button type="primary" size="small" plain style="margin: 5px;" icon="el-icon-circle-plus"
      v-if="checkPurchaseButten()"
     @click="openDialog()"
      >设备采购</el-button>

  <el-table
      size="mini"
      :data="purchaseMsgs.filter(data => !search || data.count.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        align="center"
        label="采购平台"
        prop="purchaseUser.userName">
      </el-table-column>
      <el-table-column
        align="center"
        label="收货平台"
        prop="consigneeUser.userName">
      </el-table-column>
      <el-table-column
        align="center"
        label="收货省份"
        prop="consigneeUser.province">
      </el-table-column>
      <el-table-column
        align="center"
        label="收货城市"
        prop="consigneeUser.city">
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        prop="status">
        <template slot-scope="scope">
          <el-tag :type="getStatusStyle(scope.row)">{{getStatus(scope.row)}}</el-tag>
        </template>
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
        label="数量"
        prop="count">
      </el-table-column>
      <el-table-column
        align="center"
        width="145px"
        label="采购时间"
        prop="purchaseTime">
      </el-table-column>
      <el-table-column
        align="center"
        width="145px"
        label="收货时间"
        prop="arriveTime">
      </el-table-column>
      <el-table-column
        align="center"
        width="145px"
        label="作废时间"
        prop="scrapTime">
      </el-table-column>
      <el-table-column
        width="200px"
        align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
         <template slot-scope="scope">
           <!-- 收货操作 -->
           <el-popconfirm
             title="确认执行收货操作吗？"
             @onConfirm="receive(scope.row)"
             placement="left">
             <el-button
                slot="reference"
                v-if="checkReceive(scope.row)"
                size="mini"
                type="success">确认收获</el-button>
             </el-popover>
           </el-popconfirm>
           <!-- 报废操作 -->
           <el-popconfirm
             title="确认要作废吗？"
             placement="left"
             @onConfirm="deleteRow(scope.row)">
             <el-button
              slot="reference"
              v-if="checkCreateUser(scope.row)"
              size="mini"
              type="danger"
              >作废</el-button>
           </el-popconfirm>
         </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="设备采购"
      :visible.sync="centerDialogVisible"
      width="400px"
      center>
      <el-form :model="purchaseMsg" ref="purchaseMsg" :rules="rules">
        <el-form-item label="收货省份:" label-width="90px" prop="province">
          <el-select v-model="purchaseMsg.province" placeholder="请选择收货省份" @change="changeProvince()">
            <el-option
            v-for="item in province"
            :key="item.province"
            :label="item.province"
            :value="item.province">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收货城市:" label-width="90px" prop="city">
          <el-select v-model="purchaseMsg.city" placeholder="请选择收货城市" @focus="getCitis()"  @change="clearPlatforms()">
            <el-option
            v-for="item in city"
            :key="item.city"
            :label="item.city"
            :value="item.city">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收货平台:" label-width="90px" prop="consigneeUserId">
          <el-select v-model="purchaseMsg.consigneeUserId" placeholder="请选择收货平台" @focus="getPlatform()" >
            <el-option
            v-for="item in platforms"
            :key="item.id"
            :label="item.userName"
            :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备品牌:" label-width="90px" prop="brand">
          <el-select v-model="purchaseMsg.brand" placeholder="请选择收货平台" @change="changeEquipmentBrand()" >
            <el-option
              v-for="item in brand"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备型号:" label-width="90px" prop="type">
          <el-select v-model="purchaseMsg.type" placeholder="请选择收货平台" @focus="getEquipmentType()" >
            <el-option
              v-for="item in equipmentType"
              :key="item.equipmentTypeNum"
              :label="item.equipmentTypeNum"
              :value="item.equipmentTypeNum">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备尺寸:" label-width="90px" prop="size">
          <el-select v-model="purchaseMsg.size" placeholder="请选择收货平台" @focus="getEquipmentSize()"  >
            <el-option
              v-for="item in equipmentSize"
              :key="item.size"
              :label="item.size"
              :value="item.size">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购数量:" label-width="90px" prop="count" width="194px">
          <el-input placeholder="请填写型号" v-model.number="purchaseMsg.count"  ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearDialog()">取 消</el-button>
        <el-button type="primary" @click="addPurchaseNote()">确 定</el-button>
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
      },
      userMsg: ''


    },
    data(){
      return{
        // 城市列表
        city: [],
        // 设备型号列表
        equipmentType: [],
        // 设备尺寸列表
        equipmentSize: [],
        // 收货平台列表
        platforms: [],
        centerDialogVisible: false,
        visible: false,
        visible2: false,
        search: '',
        // 新增采购信息
        purchaseMsg: {
          // 采购人Id
          purchaseUserId: '',
          // 收货省份
          province: '',
          // 收货城市
          city: '',
          // 收货平台
          consigneeUserId:'',
          // 品牌
          x: '',
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
          size:[{required: true, message: '请选择尺寸！', trigger:'change'}],
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
      // 关闭对话框
      clearDialog(){
        this.remakePurchaseMsg()
        this.centerDialogVisible = false
      },
      // 城市获得焦点后获取城市信息
      getCitis(){
        //城市清空
        this.purchaseMsg.city = ''
        this.city = []
        let provinceId = ''
        this.province.forEach(item => {
          if(this.purchaseMsg.province == item.province){
            provinceId = item.id
          }
        })
        this.citis.forEach(item => {
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
          purchaseUserId : '',
          province: '',
          city: '',
          consigneeUserId:'',
          brand: '',
          type: '',
          size: '',
          count: '',
        }
      },
      // 是否是该用户收货
      checkReceive(row){
        if(row.consigneeUserId == this.userMsg.id && row.status == 1){
          return true
        } else {
          return false
        }
      },
      // 确认收货
      receive(row){
        let msg = {userId: this.userMsg.id,purchaseMsgId:row.id}
        this.$store.dispatch('data/receivePurchaseMsg',msg).then(res => {
          this.$router.go(0)
        })

      },
      // 是否是该创建人或者状态是否未收货
      checkCreateUser(row){
        if(row.purchaseUser.id == this.userMsg.id && row.status == 1){
          return true
        } else {
          return false
        }
      },
      // 聚焦获取型号数组
      getEquipmentType(){
        this.changeEquipmentBrand()
        this.type.forEach(item => {
          if(item.equipmentBrand == this.purchaseMsg.brand){
            this.equipmentType.push(item)
          }
        })
      },
      // 设备品牌数据更换
      changeEquipmentBrand(){
        this.equipmentType = []
        this.purchaseMsg.type = ''
        this.changeEquipmentType()

      },
      // 根据设备型号获取尺寸
      getEquipmentSize(){
        this.changeEquipmentType()
        this.type.forEach(item => {
          if(item.equipmentBrand == this.purchaseMsg.brand){
            if(item.equipmentTypeNum == this.purchaseMsg.type){
              this.equipmentSize.push(item)
            }
          }
        })
      },
      // 尺寸数据空
      changeEquipmentType(){
        this.equipmentSize = []
        this.purchaseMsg.size = ''
      },
      //添加采购单
      addPurchaseNote(){
        this.$refs['purchaseMsg'].validate((valid) => {
          if(valid){
            console.log(this.user)
            this.purchaseMsg.purchaseUserId = this.userMsg.id
            // add采购单据
            this.$store.dispatch('data/addPurchaseMsg',this.purchaseMsg).then(res => {
              this.purchaseMsgs.unshift(res.purchaseMsg)
              this.$message({
                type:'success',
                message:'采购单据添加成功'
              })
              this.clearDialog()
            })
          }
        })
      },
      // 获取状态类型
      getStatusStyle(row){
        if(row.status == 1){
          return ''
        } else if(row.status == 2){
          return 'success'
        } else {
          return 'danger'
        }
      },
      // 获取状态文字
      getStatus(row){
        if(row.status == 1){
          return '进行中'
        } else if(row.status == 2){
          return '已完成'
        } else {
          return '已作废'
        }
      },
      //报废采购单据
      deleteRow(row) {
      if(row.status == 1){
        // 进行中可以作废
        let msg = {userId: this.userMsg.id,purchaseMsgId:row.id}
        this.$store.dispatch('data/scrapPurchaseMsg',msg).then(res => {
          this.$router.go(0)
        })
      } else {
        this.messages({
          type:'danger',
          message: '报废失败！'
        })
      }
        console.log('12321')
      },
      // 设备采购按钮是否显示
      checkPurchaseButten(){
        if(this.userMsg.roleNum == 'R1001' || this.userMsg.roleNum == 'R1002' || this.userMsg.roleNum == 'R1005'){
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style>
</style>
