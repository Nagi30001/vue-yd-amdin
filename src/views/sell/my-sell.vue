<template>
  <div>
    <el-tabs type="border-card" style="margin: 10px;">
      <el-tab-pane label="我的单据">
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
                  <el-form-item label="操作:" v-if="checkShowDelet(props.row.receiptsStatus)" >
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          myReceipts: [],
          screenWidth: document.body.clientWidth,
          visible: false,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          srcList: [
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          ]
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
    checkShowDelet(status){
      if(status == 0 || status == 4 ){
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
      console.log(row)
    }
      },
      // 初始化数据
      created() {
        // 初始化数据
        this.getData()
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
</style>
