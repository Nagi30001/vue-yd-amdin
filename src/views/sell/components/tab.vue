<template>
  <div>
      <el-table
        size="mini"
        :v-loading="loading"
        :data="reachCheck"
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
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          v-if="ifScreenWidth(screenWidth,1000)"
          header-align="center"
          align="center"
          min-width="70px"
          label="销售工号"
          prop="user.jobNum">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          min-width="70px"
          label="创建人"
          prop="user.userName">
        </el-table-column>
        <el-table-column
           width="60px"
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
             v-if="ifScreenWidth(screenWidth,1000)"
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
           <el-table-column
             header-align="center"
             align="center"
             label="到店确认">
             <template slot-scope="scope">
               <el-button
                 v-if="clickType === 'tReachCheck'"
                 size="mini"
                 type="danger"
                 @click="tReachCheck(scope.$index,scope.row)">
                 {{checkType}}</el-button>
               <el-button
                 v-if="clickType === 'tGatheringCheck'"
                 size="mini"
                 type="danger"
                 @click="tGatheringCheck(scope.$index,scope.row)">
                 {{checkType}}</el-button>
               <el-button
                 v-if="clickType === 'tInstallCheck'"
                 size="mini"
                 type="danger"
                 @click="tInstallCheck(scope.$index,scope.row)">
                 {{checkType}}</el-button>
             </template>
           </el-table-column>
      </el-table>
      <!-- 上传图片 -->
      <el-dialog
        title="上传收款图片"
        :visible.sync="gatheringVisible"
        width="80%">
        <span>收款图片:</span>
        <el-upload
          ref="upload"
          action="http://192.168.0.103:9527/dev-api/sell/uploadFile"
          :headers="headers()"
          list-type="picture-card"

          :limit="3"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.zip"
          style="width: 100%;"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :data="getfileData()"
          :auto-upload="false">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip" style="width: 100%;">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
       <span slot="footer" class="dialog-footer">
          <el-button @click="cancelDialog()">取 消</el-button>
          <el-button type="primary" @click="tGatheringCheckImages()">确 定</el-button>
        </span>
      </el-dialog>




      <!-- 安装确认对话框 -->
      <el-dialog
        title="安装信息"
        :visible.sync="searchDialog"
        width="90%">
        <!-- 标题文本查询 -->
        <label style="width: 80px;">ICCID:</label>
        <el-input  placeholder="销售名称" v-model="installMsg.iccid" style="width: 200px; margin: 5px;" class="filter-item"   />
        <label style="width: 80px;">设备品牌:</label>

        <!-- 结束日期 -->
        <label style="width: 80px;">设备型号:</label>
        <el-date-picker class="filter-item" style="width: 200px;margin: 5px;" v-model="queryDate.endDay" type="date" placeholder="结束日期"></el-date-picker>
        <!-- 客户信息 -->
        <label style="width: 80px;">设备尺寸:</label>
        <el-input  placeholder="可以输入客户姓名查询" v-model="installMsg.iccid" style="width: 200px; margin: 5px;" class="filter-item"   />
        <label style="width: 80px;">客户车牌:</label>
        <el-input  placeholder="可以输入客户车牌查询" v-model="installMsg.iccid" style="width: 200px; margin: 5px;" class="filter-item"   />
        <span slot="footer" class="dialog-footer">
          <el-button @click="searchDialog = false">取 消</el-button>
          <el-button type="primary" @click="searchDialog = false">确 定</el-button>
        </span>
      </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      </div>

    </template>

<script>
  export default{
    data(){
      return {
        formLabelWidth: '120px',
        dialogFormVisible:false,
        gatheringVisible: false,
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        searchDialog: false,
        checkData: {
          id:'',
          type:'',
          data:{
            time:'',
            images:[]
          },
        },
        fileData:{
          fileId:'',
          fileType:'',
          fileDesc:'',
          filePath:'',
          fileUserId:''
        },
        installMsg: {
          iccid: '',
          equipmentBrand: '',
          equipmentTypeNum: '',
          size: ''
        },
        screenWidth: document.body.clientWidth,
      }
    },
    name:'tab',
    props:{
      reachCheck:{
        type:Array
      },
      loading:false,
      checkType:'',
      clickType:{
        type: String
      },
      status:'',
      // 设备品牌
      equipmentBrand:{
        type: Array
      },



    },
    methods:{
      // 到店确认
      tReachCheck(index,row){
        let checkData = {id:row.id,type:'reachCheck', data:{time:''}}
        checkData.data.time = Date.parse(new Date())
        console.log(checkData)
        this.$store.dispatch('sell/reachCheck',checkData).then(res => {
          // 删除某行数据
          this.reachCheck.splice(index)
          popup(res.type,res.message)
        })
      },
      // 发送收款确认请求,带图片
      tGatheringCheckImages(){
       let images = this.$refs.upload.uploadFiles;
       console.log(images.length)
       console.log(images)
       if(images.length < 1){
         // 错误信息
       } else {
         let checkData = this.checkData
         // 发送上传图片请求
         this.$refs.upload.submit();
         // 确认收款请求
         this.$store.dispatch('sell/reachCheck',checkData).then(res => {
          this.$router.go(0)
         })
       }

      },
      // 收款确认,确认金额,上传收款图
      tGatheringCheck(index,row){
        console.log('tGatheringCheck')
        console.log(this.$data)
        this.gatheringVisible = true
        this.checkData.id = row.id
        this.checkData.type = 'gatheringCheck'
        this.checkData.data.time = Date.parse(new Date())
        // 单据ID
        this.fileData.fileId = row.id
        this.fileData.fileType = 'gatheringCheck'
        // 绑定用户ID
        this.fileData.fileUserId = this.$store.state.user.userMsg.jobNum
        console.log(this.fileData)
        // let checkData = {id:row.id,type:'reachCheck', data:{time:''}}
        // checkData.data.time = Date.parse(new Date())
        // console.log(checkData)

        // this.$store.dispatch('sell/reachCheck',checkData).then(res => {
        //   // 删除某行数据
        //   this.reachCheck.splice(index)
        //   popup(res.type,res.message)
        // })
      },
      // 上传图片
      beforeUpload(file){
        console.log(this.fileData)
        // this.$store.dispatch('sell/uploadFile',this.fileData,file).then(res => {

        // })
      },
      //安装完成确认,需要填写其他相关信息
      tInstallCheck(index,row){
        console.log('tInstallCheck')
        this.dialogFormVisible = true
        this.checkData.id = row.id
        this.checkData.type = 'gatheringCheck'
        this.checkData.data.time = Date.parse(new Date())


      },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(this.$data)
      },
      handleDownload(file) {
        console.log(file);
      },
      getfileData() {
        return this.fileData
     },
     handlePreview(file) {
       console.log(file);
       console.log(this.$data);
     },
     cancelDialog(){
       this.gatheringVisible = false
       this.$refs.upload.uploadFiles = []
       console.log(this.$refs.upload)
     }
     ,
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
     headers(){
       return {'X-Token':this.$store.state.user.token}
     },
     // 根据宽度自动显示字段
     ifScreenWidth(width,num){
       if(width >= num){
         return true
       } else {
         return false
       }
     },
    }

  }
</script>

<style>
</style>
