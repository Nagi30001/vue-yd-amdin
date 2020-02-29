<template>
  <div>
    <el-tabs type="border-card" style="margin: 10px;" v-model="activeName" >
    <el-tab-pane label="设备库存" name="first" v-if="checkTab('all')">
      <inventoryTab :informationMsg="equipmentMsg.informationMsg"></inventoryTab>
    </el-tab-pane>
    <el-tab-pane label="设备采购" v-if="checkTab('all')">
      <purchaseTab :purchaseMsgs="equipmentMsg.purchaseMsg" :userMsg="equipmentMsg.user" :platform="equipmentMsg.platform" :brand="equipmentMsg.equipmentBrand" :type="equipmentMsg.equipmentType" :province="equipmentMsg.provinces" :citis="equipmentMsg.citis"></purchaseTab>
    </el-tab-pane>
    <el-tab-pane label="设备转移" v-if="checkTab('all')">
      <transferTab :transferMsg="equipmentMsg.transferMsg" ></transferTab>
    </el-tab-pane>
    <el-tab-pane label="设备维修" v-if="checkTab('YD')">
      <maintainTab :maintainMsg="equipmentMsg.maintainMsg" ></maintainTab>
    </el-tab-pane>
    <el-tab-pane label="设备报废" v-if="checkTab('YD')">
      <scrapTab :scrapMsg="equipmentMsg.scrapMsg" ></scrapTab>
    </el-tab-pane>
<!--    <el-tab-pane label="更换记录" v-if="checkTab('all')">
      <scrapTab :scrapMsg="equipmentMsg.scrapMsg" ></scrapTab>
    </el-tab-pane> -->
  </el-tabs>

  <!-- 新增销售类型弹出框 -->
  <el-dialog
    :title=" checkPattern ? '新增销售类型':'更新信息' "
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
    <span>需要注意的是内容是默认不居中的</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
  import inventoryTab from './components/inventory-tab.vue'
  import maintainTab from './components/maintain-tab.vue'
  import purchaseTab from './components/purchase-tab.vue'
  import scrapTab from './components/scrap-tab.vue'
  import transferTab from './components/transfer-tab.vue'
  import { mapGetters } from 'vuex'
  export default {
      components:{
        // 设备库存
        inventoryTab,
        // 设备维修
        maintainTab,
        // 设备采购
        purchaseTab,
        // 设备报废
        scrapTab,
        // 设备转移
        transferTab,
      },
      computed: {
        ...mapGetters([
          'roles'
        ])
      },
      data() {
        return {
          sellTypes:[],
          centerDialogVisible: false,
          // true=update false=add
          checkPattern: false,
          activeName: 'first',
          equipmentMsg:{
            // 库存信息
            informationMsg:[],
            // 采购信息
            purchaseMsg: [],
            // 转移信息
            transferMsg: [],
            // 维修信息
            maintainMsg: [],
            // 报废信息
            scrapMsg: [],
            // 更换信息
            changeMsg: [],
            // 收货平台
            platform: [],
            // 设备信息
            equipmentMsg: [],
            // 设备品牌
            equipmentBrand: [],
            // 设备型号
            equipmentType: [],
            // 省份
            provinces: [],
            // 城市
            citis: [],
            // 用户信息
            user: '',
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
        // 初始化数据
        getData(){
          this.$store.dispatch('data/getEquipmentInventory').then(res => {
            this.equipmentMsg.user = this.$store.state.user.userMsg
            console.log('123333')
            console.log(this.equipmentMsg.user)
            if(this.equipmentMsg.user.roleNum == 'R1001' || this.equipmentMsg.user.roleNum == 'R1002' || this.equipmentMsg.user.roleNum == 'R1005'){
              console.log('管理用户')
              this.equipmentMsg.informationMsg = res.informationMsg
              this.equipmentMsg.purchaseMsg = res.purchaseMsg
              this.equipmentMsg.transferMsg = res.transferMsg
              this.equipmentMsg.maintainMsg = res.maintainMsg
              this.equipmentMsg.scrapMsg = res.scrapMsg
              this.equipmentMsg.changeMsg = res.changeMsg
              this.equipmentMsg.equipmentMsg = res.equipmentMsg
              this.equipmentMsg.provinces = res.provinces
              this.equipmentMsg.citis = res.cities
              this.equipmentMsg.platform = res.platform
            } else {
              console.log('平台用户')
              this.equipmentMsg.informationMsg = res.informationMsg
              this.equipmentMsg.purchaseMsg = res.purchaseMsg
              this.equipmentMsg.transferMsg = res.transferMsg
              this.equipmentMsg.changeMsg = res.changeMsg
              this.equipmentMsg.equipmentMsg = res.equipmentMsg
              this.equipmentMsg.provinces = res.provinces
              this.equipmentMsg.citis = res.cities
              this.equipmentMsg.platform = res.platform
            }


            // 设备品牌
            this.equipmentMsg.equipmentMsg.forEach(item => {
              this.equipmentMsg.equipmentBrand.push(item.equipmentBrand)
            })
            this.equipmentMsg.equipmentBrand = Array.from(new Set(this.equipmentMsg.equipmentBrand))
            // 设备型号
            this.equipmentMsg.equipmentType = res.equipmentMsg
          })
        },
        //
        checkTab(str){
          if(this.equipmentMsg.user.roleNum == 'R1001' || this.equipmentMsg.user.roleNum == 'R1002' || this.equipmentMsg.user.roleNum == 'R1005'){
            if(str == 'all' || str == 'YD'){
              return true
            } else {
              return false
            }
          } else {
            if(str == 'all'){
              return true
            } else {
              false
            }
          }
        }
      },
      created() {
        this.getData()
      }
    }
</script>

<style>
</style>
