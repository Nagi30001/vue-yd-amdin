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
          header-align="center"
          align="center"
          min-width="70px"
          label="销售工号"
          prop="user.jobNum">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          width="60px"
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
             label="信息确认">
             <template slot-scope="scope">
               <el-button
                 v-if="clickType === 'tReachCheck'"
                 class="filter-item" type="danger"
                 size="small"
                 plain
                 @click="tReachCheck(scope.$index,scope.row)">
                 {{checkType}}</el-button>
               <el-button
                 v-if="clickType === 'tGatheringCheck'"
                 class="filter-item" type="danger"
                 size="small"
                 plain
                 @click="tGatheringCheck(scope.$index,scope.row)">
                 {{checkType}}</el-button>
               <el-button
                 v-if="clickType === 'tInstallCheck'"
                 class="filter-item" type="danger"
                 size="small"
                 plain
                 @click="tInstallCheck(scope.$index,scope.row)">
                 {{checkType}}</el-button>
             </template>
           </el-table-column>
      </el-table>
      <!-- 上传图片 -->
      <el-dialog
        title="上传收款图片"
        :visible.sync="gatheringVisible"
        width="400px">
        <span>收款图片:</span>
        <el-upload
          ref="upload"
          action="http://49.234.210.89/prod-api/sell/uploadFile"
          :headers="headers()"
          list-type="picture-card"
          limit=1
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.zip"
          style="width: 100%;"
          :on-preview="handlePreview"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          :data="getfileData()"
          :auto-upload="false">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip" style="width: 100%;">
            只能上传图片文件,且只能上传一张!
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
        width="400px">
        <el-form :model="installMsg" ref="installMsg" :rules="rules" status-icon>
          <el-form-item label="ICCID:" label-width="90px" prop="iccid">
             <el-input placeholder="请填写型号" v-model="installMsg.iccid" autocomplete="off" style="width: 230px;"></el-input>
          </el-form-item>
          <el-form-item label="设备型号:" label-width="90px" prop="equipment">
              <el-select v-model="installMsg.equipment" placeholder="请选择安装的设备型号" style="width: 230px;">
                <el-option
                  v-for="item in inventoryMsg"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="车牌号码:" label-width="90px" prop="carNum">
             <el-input placeholder="请填写车牌号码" v-model="installMsg.carNum" autocomplete="off" style="width: 230px;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="clearDialog()">取 消</el-button>
          <el-button type="primary" @click="checkInstallMsg()">确 定</el-button>
        </span>
      </el-dialog>

      </div>

    </template>

<script>
import {isCarNum} from '@/utils/validate'

// 车牌号码检验
let checkCarNum = (rule,value,callback) => {
  if (!isCarNum(value)){
    return callback(new Error('请输入正确车牌号码'))
    }
  callback()
}

  export default{
    data(){
      // iccid验证
      let checkIccid = (rule,value,callback) => {
        if(value.length != 19){
          return callback(new Error('请检查iccid的长度!'))
        }
        this.$store.dispatch('data/checkIccid',value).then(res => {
          if(res.result){
            callback()
          } else {
            return callback(new Error(res.message))
          }
        })
      }
      return {
        checkCarNum,
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
          // 用户id
          userId:'',
          iccid: '',
          equipment:'',
          // 车牌号码
          carNum:'',
          // 单据id
          carReceiptsId:''
        },
        screenWidth: document.body.clientWidth,
        rules:{
          iccid:[{required: true, validator: checkIccid, trigger:'blur'}],
          equipment:[{required: true, message: '请选择收货省份！', trigger:'change'}],
          carNum:[{required: true, validator: checkCarNum, trigger:'blur'}]
        }
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
      // 设备库存
      inventoryMsg:{
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
          this.$router.go(0)
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

         // 发送上传图片请求
         this.$refs.upload.submit();
         // 检查图片是否上传成功了,然后提交收款确认请求，否则不提交
          
       }


      },
      // 文件上传后的钩子
      handleAvatarSuccess(response, file, fileList){
        if(response.code == 20000){
          // 确认收款请求
          let checkData = this.checkData
          this.$store.dispatch('sell/reachCheck',checkData).then(res => {
            // 当前页刷新
           this.$router.go(0)
          })
        }
        console.log(response)
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
        this.resetInstallMsg()
        this.installMsg.userId = this.$store.state.user.userMsg.id
        this.installMsg.carReceiptsId = row.id
        this.searchDialog = true
      },
      // 安装信息重置
      resetInstallMsg(){
        this.installMsg = {
          // 用户id
          userId:'',
          iccid: '',
          equipment:'',
          carNum:'',
          // 单据id
          carReceiptsId:''
        }
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
     handleChange(){
       this.installMsg.equipment = ''
     },
     // 安装信息对话框取消
     clearDialog(){
       this.resetInstallMsg()
       this.$refs['installMsg'].resetFields()
       this.searchDialog = false
     },
     // 安装信息检查
     checkInstallMsg(){
       this.$refs['installMsg'].validate(valid => {
         if(valid){
           // 补充信息
           // 验证通过,发送请求
           this.$store.dispatch('sell/pushInstallMsg',this.installMsg).then(res => {
             // 刷新当前页面
             this.$router.go(0)
           })
         } else {
           return false
         }
       })
     }
    }

  }
</script>

<style>
</style>
