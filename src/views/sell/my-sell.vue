<template>
  <div>
    <el-tabs type="border-card" style="margin: 10px;" class="wrap">
      <el-tab-pane label="我的单据"
      :infinite-scroll-disabled="busy"
      v-infinite-scroll="load"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check=false>
        <div >
           <!-- 查询按钮 -->
           <el-button  class="filter-item" type="primary" plain icon="el-icon-zoom-in" style="margin: 5px;" size="small" @click="searchDialog = true">
             条件查询
           </el-button>
           <!-- 页面刷新 -->
           <el-button class="filter-item"  type="primary" plain icon="el-icon-refresh-right" style="margin: 5px;" size="small" @click="pageRefresh()">
             页面刷新
           </el-button>
         </div>
        <span style="font-size: 11px; font-style: oblique;">当前展示：{{getMyReceiptSize()}} 条</span>
        <el-table
            size="mini"
            :data="myReceipts"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
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
                  <el-form-item label="操作:" v-if="checkShowDelet(props.row)" >
                    <!-- 提示 -->
                    <el-popover
                      placement="top"
                      width="160"
                      v-model="visible">
                       <p>确认报废该单据?</p>
                       <div style="text-align: right; margin: 0">
                           <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                           <el-button type="primary" size="mini" @click="cancellation(props.row)">确定</el-button>
                        </div>
                      <el-button type="danger" size="small" slot="reference">报废单据</el-button>
                    </el-popover>
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
               header-align="center"
               align="center"
               label="创建人"
               prop="user.userName">
             </el-table-column>
             <el-table-column
                header-align="center"
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
               header-align="center"
               align="center"
               label="客户姓名"
               prop="clientName">
             </el-table-column>
             <el-table-column
               v-if="ifScreenWidth(screenWidth,1000)"
               header-align="center"
               align="center"
               label="省份"
               prop="province">
             </el-table-column>
             <el-table-column
               v-if="ifScreenWidth(screenWidth,1000)"
               header-align="center"
               align="center"
               label="城市"
               prop="city">
             </el-table-column>
             <el-table-column
               header-align="center"
               align="center"
               label="客户车牌"
               prop="clientCarNum">
             </el-table-column>
             <el-table-column
               v-if="ifScreenWidth(screenWidth,1000)"
               header-align="center"
               align="center"
               label="安装平台"
               prop="tpUser.userName">
             </el-table-column>
          </el-table>
          <div style="text-align: center;" v-if="busy">
            <span style="font-size: 11px; font-style: oblique;"  >已无更多数据！</span>
          </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 查询条件对话框 -->
    <el-dialog
      title="条件查询"
      :visible.sync="searchDialog"
      width="400px"
      >
      <!-- 标题文本查询 -->
      <label style="width: 80px;">单据状态:</label>
      <el-select v-model="queryDate.status" placeholder="默认全部状态" style="width: 200px;margin: 5px;">
        <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value" @change="queryDateChange()" ></el-option>
      </el-select>
      <label style="width: 80px;">时间类型:</label>
      <el-select v-model="queryDate.checkTimeType" placeholder="默认全部平台" style="width: 200px;margin: 5px;">
        <el-option v-for="item in checkTimeType" :key="item" :label="item" :value="item" @change="queryDateChange()" ></el-option>
      </el-select>
      <label style="width: 80px;">开始日期:</label>
      <el-date-picker class="filter-item" style="width: 200px;margin: 5px;" v-model="queryDate.startingDate" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="queryDateChange()"></el-date-picker>
      <!-- 结束日期 -->
      <label style="width: 80px;">结束日期:</label>
      <el-date-picker class="filter-item" style="width: 200px;margin: 5px;" v-model="queryDate.endDay" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="queryDateChange()"></el-date-picker>
      <!-- 客户信息 -->
      <label style="width: 80px;">客户姓名:</label>
      <el-input  placeholder="输入客户姓名查询" v-model="queryDate.clientName" style="width: 200px; margin: 5px;" class="filter-item" @change="queryDateChange()"   />
      <label style="width: 80px;">客户车牌:</label>
      <el-input  placeholder="输入客户车牌查询" v-model="queryDate.clientCarNum" style="width: 200px; margin: 5px;" class="filter-item"  @change="queryDateChange()"  />
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearQueryDate()">取 消</el-button>
        <el-button type="primary" @click="searchQueryDatecheck() ">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          myReceipts: [],
          loadingReceipts: [],
          screenWidth: document.body.clientWidth,
          visible: false,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          srcList: [
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          ],
          busy: false,
          searchDialog :false,
          checkTimeType: [],
          status: [],
          // 全部查询true/条件查询false
          searchType:true,
          // 数据加载
          loading : true,
          // 查询条件
          queryDate:{
            // 类型
            type: 'YD',
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
            additionType:[],
            // 渠道
            channel:'',
            // 用户Id
            userId: '',
            // 单据状态
            status: '',
            page:0,
            count:25
          },

        }
      },
      methods:{
        // 根据宽度自动显示字段
        ifScreenWidth(width,num){
          if(width >= num){
            return true
          } else {
            return false
          }
        },
        // 初始化数据,销售用户获取我得销售单据,平台用户获取我安装的单据
        getData(){
          this.$store.dispatch('sell/getMyReceipts').then(res => {
            this.myReceipts = res.myReceipts
          })
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
    // 判断删除单据是否显示,已完成不显示,其他状态均可显示
    checkShowDelet(row){
     if(row.userId != this.$store.state.user.userMsg.id || row.receiptsStatus == 0 || row.receiptsStatus == 4 ){
       return false
     } else {
       return true
     }
    },
    // 作废单据
    cancellation(row){
      this.$store.dispatch('sell/cancellation',row.id).then(res => {
        // 刷新当前页面
        this.$router.go(0)
      })

    },
    getMyReceiptSize(){
      return this.myReceipts.length
    },
    pageRefresh(){
      this.$router.go(0)
    },
    // 清除条件查询里的数据
    remakeQueryDate(){
      this.queryDate.startingDate = this.getThisMonthFirstDay()
      this.queryDate.endDay = this.getToday()
      this.queryDate.sellName = ''
      this.queryDate.TPId = ''
      this.queryDate.clientName = ''
      this.queryDate.clientCarNum = ''
      this.queryDate.checkTimeType = '创建时间'
      // 销售类型
      this.queryDate.sellType = ''
      // 附加业务
      this.queryDate.additionType = []
      // 渠道
      this.queryDate.channel = ''
      // 用户Id
      this.queryDate.userId =  this.$store.state.user.userMsg.id
      // 单据状态
      this.queryDate.status = ''
      this.queryDate.page = 0
      this.queryDate.count = 25
      this.checkMyisYDOrTP()
    },
    checkMyisYDOrTP(){
      if(this.$store.state.user.userMsg.roleNum == 'R1004'){
        this.queryDate.type = 'PT'
      } else {
        this.queryDate.type = 'YD'
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
    // 取消条件查询
    clearQueryDate(){
      this.searchDialog = false
      this.remakeQueryDate()
    },
    queryDateChange(){
      this.queryDate.page = 0
      console.log("条件变化！")
    },
    // 根据条件查询响应的单据
    searchQueryDate(){
      this.searchType = false
      this.loading = true
      this.searchDialog = false
      this.myReceipts = []
      this.busy = false
      this.$store.dispatch('sell/searchQueryDate',this.queryDate).then(res => {
        this.loadingReceipts = res.carReceipts
        this.loadingReceipts.forEach(item => {
          this.myReceipts.push(item)

        })
        if(this.loadingReceipts.length < 25){
          this.busy = true
        }
        this.loading = false
        console.log(res)
        this.$message({
          type: 'success',
          message: '查询成功'
        })
      })
    },
    searchQueryDatecheck(){
      this.queryDate.page = 0
      this.searchQueryDate()
    },
    // 滚动加载
    load(){
      this.loading = true
       if(this.searchType) {
         this.busy = true
       } else {
         // 条件查询
         this.queryDate.page += 1
         this.loading = false
         this.searchQueryDate()
         console.log('执行条件加载！')
       }
    },

  },
  // 初始化数据
  created() {
    // 初始化数据
    this.getData()
    this.remakeQueryDate()
    this.queryDate.userId = this.$store.state.user.userMsg.id
    this.queryDate.startingDate = this.getThisMonthFirstDay()
    this.queryDate.endDay = this.getToday()
    this.remakeQueryDate()
    this.resteCheckTimeType()
    this.resteCheckStatusType()
  }

    }
</script>

<style>
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
  /* 解决滚动加载报错问题 */
  .wrap {
    height: 80vh;
    overflow-y: auto;
  }  
</style>
