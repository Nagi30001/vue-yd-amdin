<template>
  <el-tabs type="border-card" style="margin: 10px;" class="wrap"
  infinite-scroll-disabled="busy"
  v-infinite-scroll="load"
  infinite-scroll-immediate-check=false
  infinite-scroll-throttle-delay=100000>
    <el-tab-pane label="报单大厅">
  <div >
   <div >
      <!-- 查询按钮 -->
      <el-button  class="filter-item" type="primary" plain icon="el-icon-zoom-in" style="margin: 5px;" size="small" @click="searchDialog = true" >
        条件查询
      </el-button>
      <!-- 添加按钮 -->
      <el-button class="filter-item"  type="primary" plain icon="el-icon-plus" style="margin: 5px;" size="small" @click="handleCreate"  >
        新增单据
      </el-button>
      <!-- 页面刷新 -->
      <el-button class="filter-item"  type="primary" plain icon="el-icon-refresh-right" style="margin: 5px;" size="small" @click="pageRefresh()">
        页面刷新
      </el-button>
    </div>
    <!-- 表格信息 -->
    <el-table
      v-loading="loading"
      size="mini"
      :data="receipts"
      style="width: 100%;"
      >
      <el-table-column type="expand" >
        <template slot-scope="props"   >
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="销售工号:">
              <span>{{ props.row.user.jobNum }}</span>
            </el-form-item>
            <el-form-item label="创建人:">
              <span>{{ props.row.user.userName }}</span>
            </el-form-item>
            <el-form-item label="客户姓名:">
              <span>{{ props.row.clientName }}</span>
            </el-form-item>
           <el-form-item label="省份:">
              <span>{{ props.row.province }}</span>
            </el-form-item>
            <el-form-item label="城市:">
              <span>{{ props.row.city }}</span>
            </el-form-item>
            <el-form-item label="客户电话:">
              <span>{{ props.row.clientPhone }}</span>
            </el-form-item>
            <el-form-item label="客户车牌:">
              <span>{{ props.row.clientCarNum }}</span>
            </el-form-item>
            <el-form-item label="客户车型:">
              <span>{{ props.row.carBrand }}</span>
            </el-form-item>
            <el-form-item label="安装平台:">
              <span>{{ props.row.tpUser.userName }}</span>
            </el-form-item>
            <el-form-item label="数量:">
              <span>{{ props.row.count }}</span>
            </el-form-item>
            <el-form-item label="销售类型:">
              <span>{{ props.row.sellTypeName }}</span>
            </el-form-item>
            <el-form-item label="附加业务:">
              <span>{{ props.row.additionType }}</span>
            </el-form-item>
            <el-form-item label="渠道:">
              <span>{{ props.row.sellTypeName }}</span>
            </el-form-item>
            <el-form-item label="应付金额:">
              <span>{{ props.row.money }}</span>
            </el-form-item>
            <el-form-item label="应付押金:">
              <span>{{ props.row.cashPledge }}</span>
            </el-form-item>
            <el-form-item label="收款方:">
              <span>{{ props.row.gatheringType }}</span>
            </el-form-item>
            <el-form-item label="收款图片:">
              <div class="demo-image__preview" v-for="item in props.row.imageUrls" :key="item.id" >
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item"
                  :preview-src-list="props.row.imageUrls">
                </el-image>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
     <el-table-column
        v-if="ifScreenWidth(screenWidth,1000)"
        align="center"
        min-width="70px"
        label="销售工号"
        prop="user.jobNum">
      </el-table-column>
     <el-table-column
        align="center"
        min-width="60px"
        label="创建人"
        prop="user.userName">
      </el-table-column>
     <el-table-column
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div class="block">
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in scope.row.timeMsgs"
                  :key="index"
                  :icon="activity.icon"
                  :type="activity.type"
                  :color="activity.color"
                  :timestamp="activity.typeTime">
                  {{activity.typeName}}
                </el-timeline-item>
              </el-timeline>
            </div>
            <div slot="reference" class="name-wrapper">

              <el-tag :type="checkStatusStyle(scope.row)" size="mini">{{checkStatus(scope.row)}}</el-tag>
            </div>
          </el-popover>
        </template>
       </el-table-column>
     <el-table-column
        align="center"
        label="客户姓名"
        prop="clientName">
      </el-table-column>
      <el-table-column
        v-if="ifScreenWidth(screenWidth,1000)"
        align="center"
        label="省份"
        prop="province">
      </el-table-column>
      <el-table-column
        v-if="ifScreenWidth(screenWidth,1000)"
        align="center"
        label="城市"
        prop="city">
      </el-table-column>
      <el-table-column
        v-if="ifScreenWidth(screenWidth,800)"
        width="120px"
        align="center"
        label="客户电话"
        prop="clientPhone">
      </el-table-column>
      <el-table-column
        width="90px"
        align="center"
        label="客户车牌"
        prop="clientCarNum">
      </el-table-column>
      <el-table-column
        v-if="ifScreenWidth(screenWidth,1800)"
        align="center"
        label="客户车型"
        prop="carBrand">
      </el-table-column>
      <el-table-column
        v-if="ifScreenWidth(screenWidth,800)"
        align="center"
        label="安装平台"
        prop="tpUser.userName">
      </el-table-column>
      <el-table-column
        v-if="ifScreenWidth(screenWidth,1200)"
        align="center"
        label="数量"
        prop="count">
      </el-table-column>
      <el-table-column
        v-if="ifScreenWidth(screenWidth,800)"
        align="center"
        label="销售类型"
        prop="sellTypeName">
      </el-table-column>
      <el-table-column
        v-if="ifScreenWidth(screenWidth,800)"
        style="font-size: 5px;"
        align="center"
        label="附加业务"
        prop="additionType">
      </el-table-column>
      <el-table-column
        v-if="ifScreenWidth(screenWidth,1300)"
        align="center"
        label="渠道"
        prop="sellTypeName">
      </el-table-column>
      <el-table-column
        v-if="ifScreenWidth(screenWidth,1400)"
        align="center"
        label="应付金额"
        prop="money">
      </el-table-column>
      <el-table-column
        v-if="ifScreenWidth(screenWidth,1500)"
        align="center"
        label="应付押金"
        prop="cashPledge">
      </el-table-column>
      <el-table-column
        v-if="ifScreenWidth(screenWidth,1600)"
        align="center"
        label="收款方"
        prop="gatheringType">
      </el-table-column>
    </el-table>
    <div >
      <!-- 新增单据 对话框, textMap[信息类型]  dialogFormVisible 对话框可见不可见  -->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="400px">
        <!-- 对话框内部信息 -->
        <el-form ref="dataForm" status-icon :rules="rules" :model="temp" label-position="left" label-width="100px" :width="DialogWidth">
          <!-- 每行信息 -->
          <el-form-item label="客户姓名:" prop="clientName"  >
            <el-input style="width: 194px;" v-model="temp.clientName" />
          </el-form-item>

          <el-form-item label="车牌号码:" prop="carNum" >
            <el-input style="width: 194px;" v-model="temp.carNum"></el-input>
          </el-form-item>

          <el-form-item label="客户电话:" prop="clientPhone" >
            <el-input style="width: 194px;" v-model.number="temp.clientPhone"></el-input>
          </el-form-item>

          </el-form-item>
          <el-form-item label="归属地:" prop="city"  >
            <!-- 选择城市-一个城市默认 -->
            <div >
            <el-cascader
                v-model="temp.city"
                :options="options"
                style="width: 194px;"
                @change="clearTP()"
                ></el-cascader></div>
          </el-form-item>
          <el-form-item label="收款方:"  prop="gatheringType" >
            <el-select v-model="temp.gatheringType" class="filter-item" placeholder="选择收款类型"  style="width: 194px;">
              <el-option v-for="item in gatheringType" :key="item.key" :label="item.display_name" :value="item.key" style="width: 194px;"  />
            </el-select>
          </el-form-item>
          <el-form-item label="客户车型:" prop="carType" >
            <el-cascader
                v-model="temp.carType"
                :options="carTyeps"
                style="width: 194px;"
                ></el-cascader>
          </el-form-item>
          <el-form-item label="到店时间:" prop="installTime">
            <el-date-picker
              v-model="temp.installTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择到店时间" style="width: 194px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="安装平台:" prop="thirdParty">
            <el-select v-model="temp.thirdParty" placeholder="请选择安装平台" @focus="getThirdParty">
              <el-option
                v-for="item in thirdPartyMsg"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售类型:" prop="sellType">
            <el-select v-model="temp.sellType" placeholder="请选择销售类型">
              <el-option
                v-for="item in sellType"
                :key="item.id"
                :label="item.sellType"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="附加业务:" prop="additionType">
            <el-select v-model="temp.additionType" multiple placeholder="请选择附加业务">
                <el-option
                  v-for="item in additionType"
                  :key="item.additionName"
                  :label="item.additionName"
                  :value="item.additionName">
                </el-option>
              </el-select>
          </el-form-item>
        </el-form>
        <!-- 框内按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="submitForm('dataForm')">
            确定
          </el-button>
        </div>
      </el-dialog>

      <!-- 确认信息对话框 -->
      <el-dialog title="信息确认" :visible.sync="dialogVisible" :width="DialogWidth" :model="temp">
        <div><span>客户姓名:{{temp.clientName}}</span></div>
        <div><span>车牌号码:{{temp.carNum}}</span></div>
        <div><span>客户电话:{{temp.clientPhone}}</span></div>
        <div><span>归属地:{{getCity()}}</span></div>
        <div><span>收款类型:{{getGatheringType()}}</span></div>
        <div><span>客户车型:{{getListIsString(temp.carType)}}</span></div>
        <div><span>到店时间:{{temp.installTime}}</span></div>
        <div><span>安装平台:{{getThirdPartyMsg()}}</span></div>
        <div><span>销售类型:{{getSellType()}}</span></div>
        <div><span>附加业务:{{getAdditionType()}}</span></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitReceipts()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 查询条件对话框 -->
    <el-dialog
      title="条件查询"
      :visible.sync="searchDialog"
      width="400px"
      >
      <!-- 标题文本查询 -->
      <label style="width: 80px;">销售人:</label>
      <el-input  placeholder="销售人员姓名" v-model="queryDate.sellName" style="width: 200px; margin: 5px;" class="filter-item"   />
      <label style="width: 80px;">平台名称:</label>
      <el-select v-model="queryDate.TPId" placeholder="默认全部平台" style="width: 200px;margin: 5px;">
        <el-option v-for="item in thirdPartyMsgAll" :key="item.id" :label="item.userName" :value="item.id" ></el-option>
      </el-select>
      <label style="width: 80px;">单据状态:</label>
      <el-select v-model="queryDate.status" placeholder="默认全部平台" style="width: 200px;margin: 5px;">
        <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value" ></el-option>
      </el-select>
      <label style="width: 80px;">时间类型:</label>
      <el-select v-model="queryDate.checkTimeType" placeholder="默认全部平台" style="width: 200px;margin: 5px;">
        <el-option v-for="item in checkTimeType" :key="item" :label="item" :value="item" ></el-option>
      </el-select>
      <label style="width: 80px;">开始日期:</label>
      <el-date-picker class="filter-item" style="width: 200px;margin: 5px;" v-model="queryDate.startingDate" type="date" placeholder="开始日期"></el-date-picker>
      <!-- 结束日期 -->
      <label style="width: 80px;">结束日期:</label>
      <el-date-picker class="filter-item" style="width: 200px;margin: 5px;" v-model="queryDate.endDay" type="date" placeholder="结束日期"></el-date-picker>
      <label style="width: 80px;">销售类型:</label>
      <el-select v-model="queryDate.sellType" placeholder="默认全部平台" style="width: 200px;margin: 5px;">
        <el-option v-for="item in sellType" :key="item.sellType" :label="item.sellType" :value="item.sellType" ></el-option>
      </el-select>
      <label style="width: 80px;">附加业务:</label>
      <el-select v-model="queryDate.additionType" collapse-tags multiple placeholder="默认全部平台" style="width: 200px;margin: 5px;">
        <el-option v-for="item in additionType" :key="item.additionName" :label="item.additionName" :value="item.additionName" ></el-option>
      </el-select>
      <label style="width: 80px;">渠道:</label>
      <el-select v-model="queryDate.channel" placeholder="默认全部平台" style="width: 200px;margin: 5px;">
        <el-option v-for="item in channel" :key="item.id" :label="item.channelName" :value="item.id" ></el-option>
      </el-select>
      <!-- 客户信息 -->
      <label style="width: 80px;">客户姓名:</label>
      <el-input  placeholder="输入客户姓名查询" v-model="queryDate.clientName" style="width: 200px; margin: 5px;" class="filter-item"   />
      <label style="width: 80px;">客户车牌:</label>
      <el-input  placeholder="输入客户车牌查询" v-model="queryDate.clientCarNum" style="width: 200px; margin: 5px;" class="filter-item"   />
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearQueryDate()">取 消</el-button>
        <el-button type="primary" @click="searchQueryDate() ">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </el-tab-pane>
  </el-tabs>
</template>
<style>
.yd-sell {
  margin-top: 10px;
  font-size: 13px;
}
.demo-table-expand {
    font-size: 0;
  }
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 250px;
}
/* 解决 el-bable 列头与列表无法对齐 */
.el-table th {
	display: table-cell!important;
}
.wrap {
  height: 100vh;
  overflow-y: auto;
}

</style>

<script>
import {isCarNum,isPhone} from '@/utils/validate'


  // 列表数据
const gatheringType = [
  { key: 'YD', display_name: '优道科技' },
  { key: 'PT', display_name: '安装平台' }
]



// 车牌号码检验
let checkCarNum = (rule,value,callback) => {
  if (!isCarNum(value)){
    return callback(new Error('请输入正确车牌号码'))
    }
  callback()
}
// 手机号码检验
let checkPhone = (rule,value,callback) => {
  console.log(rule)
  console.log(value)
  if (!isPhone(value)){
    return callback(new Error('请输入正确手机号码'))
    }
  callback()
}
  export default {
    data() {
      return {
        // 当前登陆用户信息
        user:{},
        moreConditionStatus: false,
        gatheringType,
        checkCarNum,
        checkPhone,
        // 获取用户城市信息
        citys: '',
        // 获取车型信息
        carTyeps: [],
        // 省市数据
        options: [],
        // 全部城市获取平台信息
        thirdPartyMsgAll: '',
        // 选择完城市后的平台信息
        thirdPartyMsg: [],
        // 销售类型信息
        sellType: '',
        // 附加业务信息
        additionType: '',
        // 单据信息
        receipts:[],
        // 该用户省份权限内的渠道列表
        channel:[],
        // 查询时间类型
        checkTimeType:[],
        // 状态集合
        status: [],
        // 全部查询true/条件查询false
        searchType:true,

        busy: false,
        // 全部查询信息
        allSearchMsg:{
          userId : '',
          page: 1,
          count:25
        },


        // 数据加载
        loading: true,
        // opp,
        temp: {
          clientName: '',
          carNum: '',
          clientPhone: '',
          city: '',
          gatheringType: '',
          carType: '',
          installTime: '',
          thirdParty: '',
          sellType: '',
          additionType: ''
        },
        statusOptions: ['published', 'draft', 'deleted'],
        // 查询条件
        queryDate:{
          // 类型
          type: 'DT',
          // 起始日期 //默认本月1日
          startingDate:'',
          // 终止日期 默认次月1日
          endDay:'',
          // 销售名称
          sellName:'',
          // 平台id
          TPId:'',
          // 客户姓名
          clientName:'',
          // 客户车牌
          clientCarNum:'',
          // 查询时间类型
          checkTimeType:'创建时间',
          // 销售类型
          sellType:'',
          // 附加业务
          additionType:'',
          // 渠道
          channel:'',
          // 用户Id
          userId: '',
          // 单据状态
          status: ''
        },
        // 根据页面宽度变动浮窗宽度
        DialogWidth: '60%',
        screenWidth: document.body.clientWidth,
        // 信息填写 取消
        dialogFormVisible: false,
        // 信息确认 取消
        dialogVisible: false,
        // 条件查询
        searchDialog: false,
        dialogStatus: '',
        formLabelWidth: '80px',
        activeName: ['1'],
        textMap: {
          moreCondition: 'moreCondition',
          create: '新增单据'
        },
        //  信息验证
        rules: {
          // prop 名字 要与 下面的v-model参数名一致
          // 客户姓名
          clientName : [{ required: true, message: '请输入客户姓名', trigger: 'blur' }],
          // 检查车牌号码
          carNum: [{required: true ,validator: checkCarNum, trigger: 'blur'}],
          // 检查手机号码
          clientPhone: [{required: true,validator: checkPhone, trigger: 'blur'}],
          // 归属地
          city: [{required: true, message: '请选择安装城市', trigger: 'blur'}],
          // 收款类型
          gatheringType: [{required: true, message: '请选择收款类型', trigger: 'blur'}],
          // 客户车型
          carType: [{required: true, message: '请选择客户车型', trigger: 'blur'}],
          // 到店时间
          installTime: [{required: true, message: '请选择到店时间', trigger: 'blur'}],
          // 安装平台
          sellType: [{required: true, message: '请选择安装店铺', trigger: 'blur'}],
          // 销售类型
          thirdParty: [{required: true, message: '请选择销售类型', trigger: 'blur'}],
          // 附加业务
          additionType: [{required: true, message: '请选择附加业务', trigger: 'blur'}],
        },
      }

    },
    methods: {
      // 初始化操作
      getDate(){
        this.$store.dispatch('sell/sellmsg',this.allSearchMsg).then(res => {
          this.user = res.user
          this.citys = res.citys
          this.carTyep = res.carTyep
          this.thirdPartyMsgAll = res.thirdPartyMsg
          this.sellType = res.sellType
          this.additionType = res.additionType
          this.receipts = res.receipts
          this.channel = res.channel

          // 将省份信息加工
          this.provinceProcess(res)
          // 将车辆型号信息加工
          this.carTypeProcess(res)
          this.loading = false
          console.log(this.$data)

          })
      },
      // 将省份信息加工
      provinceProcess(res){
        for(var i=0; i<res.citys.length;i++){
          let op = {value:'',label:'',children:[]}
          op.value = res.citys[i].province
          op.label = res.citys[i].province
          for(var j=0; j<res.citys[i].cities.length;j++){
            let chi = {value:'',label:''}
            chi.value = res.citys[i].cities[j].city
            chi.label = res.citys[i].cities[j].city
            op.children.push(chi)
          }
          this.options.push(op)
        }
      },
      // 将车辆型号信息加工
      carTypeProcess(res){
        for(var i=0; i<res.carType.length;i++){
          let op = {value:'',label:'',children:[]}
          op.value = res.carType[i].brand
          op.label = res.carType[i].brand
          for(var j=0; j<res.carType[i].subsidiarys.length;j++){
            let chi = {value:'',label:''}
            chi.value = res.carType[i].subsidiarys[j]
            chi.label = res.carType[i].subsidiarys[j]
            op.children.push(chi)
          }
          this.carTyeps.push(op)

        }
      },
      // 判断状态
      getStatus(num,num2){
        if(num == num2){
          return true
        }
        return false
      },
      // 设置浮窗宽度
      setDialogWidth(width){
        if(width<450){
          this.DialogWidth = '90%'
        }
        if(width >= 450 && width <= 900){
          this.DialogWidth = '600px'
        }
        if(width > 900){
          this.DialogWidth = '800px'
        }
      },

      // 获取本月第一天日期
      getThisMonthFirstDay(){
        let moment = require('moment')
        let date=new Date()
        let monthStart = date.setDate(1)
        let firstDay = moment(monthStart).format("YYYY-MM-DD")
        console.log(firstDay)
        return firstDay
      },
      // 获取今天日期 > 获取次月1日
      getToday(){
        let moment = require('moment')
        let date = new Date()
        let year = date.getFullYear();//获取当前年
        let month = date.getMonth()+2 // 获取次月
        let toDay = year+'-'+month+'-'+'01'
        let toDatoDayy = moment(date).format("YYYY-MM-DD")
        console.log(toDay)
        // 返回次月1号
        return toDay
      },
      ifScreenWidth(width,num){
        if(width >= num){
          return true
        } else {
          return false
        }
      },
      ifTimeFormat(time){
        var date = new Date(time)
        return FormatDate.FormatDate(date,'yyyy-MM-dd')
      },
      // 平台获得焦点后执行
      getThirdParty(){
        this.thirdPartyMsg = []
        if(this.temp.city != '' && this.temp.city != null){
          // console.log(this.city)
          for(var i=0;i<this.thirdPartyMsgAll.length;i++){
            if(this.thirdPartyMsgAll[i].city == this.temp.city[1]){
              this.thirdPartyMsg.push({id:this.thirdPartyMsgAll[i].id ,name:this.thirdPartyMsgAll[i].userName})
            }
          }
        }
      },
      getCity(){
        if(this.temp.city != ''){
          return this.temp.city.join("-")
        }
      },
      getGatheringType(){
        if(this.temp.gatheringType === 'YD'){
          return '优道科技'
        } else {
          return '第三方平台'
        }
      },
      getListIsString(list){
        if(list != ''){
          return list.join("-")
        }
      },
      getThirdPartyMsg(){
        if(this.temp.thirdParty != ''){
          let thirdParty = this.temp.thirdParty
          for(var i=0; i<this.thirdPartyMsg.length;i++){
            if(this.thirdPartyMsg[i].id == thirdParty){
              return this.thirdPartyMsg[i].name
            }
          }
        }
      },
      getSellType(){
        if(this.temp.sellType != ''){
          let sellType = this.temp.sellType
          for(var i=0; i<this.sellType.length;i++){
            if(this.sellType[i].id == sellType){
              return this.sellType[i].sellType
            }
          }
        }
      },
      getAdditionType(){
        if(this.temp.additionType != ''){
          let additionTypeName = []
          let additionType = this.temp.additionType
          for(var i=0; i<this.additionType.length;i++){
            for(var j=0; j<additionType.length; j++){
              if(this.additionType[i].id == additionType[j]){
                additionTypeName.push(this.additionType[i].additionName)
              }
            }
          }
          return additionTypeName.join('-')
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      resetTemp() {
        this.temp = {
          clientName: '',
          carNum: '',
          clientPhone: '',
          city: '',
          gatheringType: '',
          carType: '',
          installTime: '',
          thirdParty: '',
          sellType: '',
          additionType: ''
        }
      },
      // 新增单据数据确认
      submitForm(formName) {
         // this.$refs[formName].validate((valid) => {
         // 提交时候带上参数('dataForm') 是标签属性 rel='dataForm' .validate 是检查是否满足验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = true
          } else {
            return false;
          }
        })
      },
	  // 新增销售单据 发送请求

        submitReceipts() {
          // 发送请求
          this.$store.dispatch('sell/addSellReceipts',this.temp).then(res => {
          this.dialogVisible = false
          this.dialogFormVisible = false
          this.successMsg()
          this.receipts.unshift(res.newCarReceipts)
          })
        },
        // 反馈
        successMsg() {
          this.$message({
            message: '销售单据新增成功',
            type: 'success'
          });
        },
        // 检查状态返回对应的展示
        checkStatus(row){
          let status = row.receiptsStatus
          if(status == 1){
            return  '到店中'
          } else if(status == 2){
            return '收款中'
          } else if(status == 3){
            return '安装中'
          } else if(status == 4){
            return '已完成'
          } else {
            return '已作废'
          }
        },
        // 检查状态返回对应的展示
        checkStatusStyle(row){
          let status = row.receiptsStatus
          if(status == 1){
            return  ''
          } else if(status == 2){
            return 'warning'
          } else if(status == 3){
            return 'info'
          } else if(status == 4){
            return 'success'
          } else {
            return 'danger'
          }
        },
        // 根据条件查询响应的单据
        searchQueryDate(){
          this.loading = true
          this.searchDialog = false
          this.$store.dispatch('sell/searchQueryDate',this.queryDate).then(res => {
            this.receipts = res.carReceipts
            this.loading = false
            console.log(res)
            this.$message({
              type: 'success',
              message: '查询成功'
            })
          })


        },
        // 取消条件查询
        clearQueryDate(){
          this.searchDialog = false
          this.remakeQueryDate()
        },
        // 清除条件查询里的数据
        remakeQueryDate(){
          this.queryDate.startingDate = this.getThisMonthFirstDay()
          this.queryDate.endDay = this.getToday()
          this.queryDate.sellName = ''
          this.queryDate.TPId = ''
          this.queryDate.clientName = ''
          this.queryDate.clientCarNum = ''
        },
        // 归属地发生改变后，清空平台
        clearTP(){
          this.temp.thirdParty = ''
        },
        // 初始化查询时间类型
        resteCheckTimeType(){
          this.checkTimeType = []
          this.checkTimeType.push('创建时间')
          this.checkTimeType.push('收款时间')
          this.checkTimeType.push('安装时间')
        },
        resteCheckStatusType(){
          this.status = []
          this.status.push({value:"0",label:"已作废"})
          this.status.push({value:"1",label:"进行中"})
          this.status.push({value:"2",label:"收款中"})
          this.status.push({value:"3",label:"安装中"})
          this.status.push({value:"4",label:"已完成"})
          this.status.push({value:"-1",label:"已退款"})
        },
        // 当前页面刷新
        pageRefresh(){
          this.$router.go(0)
        },
        // 滚动加载
        load(){
          this.loading = true
           setTimeout(() => {
             this.allSearchMsg.page += 1
             this.loading = false
             this.disabled()
           },2000)

          console.log(this.allSearchMsg.page)

          // this.$store.dispatch('sell/loadSellMsg',this.allSearchMsg).then(res => {
          //     console.log(res)
          // })
        },
        // 是否禁用滚动加载
        disabled(){
          return this.loading || this.noMore
        },
        //
        noMore () {
          return this.allSearchMsg.page >= 20
        },

    },
  // 初始化
  created() {
    // 刷新后调用该方法
    this.setDialogWidth(this.screenWidth)
    this.getDate()
    this.queryDate.startingDate = this.getThisMonthFirstDay()
    this.queryDate.endDay = this.getToday()
    this.remakeQueryDate()
    this.resteCheckTimeType()
    this.queryDate.userId = this.$store.state.user.userMsg.id
    this.allSearchMsg.userId = this.$store.state.user.userMsg.id
    this.resteCheckStatusType()
  }
}
</script>
