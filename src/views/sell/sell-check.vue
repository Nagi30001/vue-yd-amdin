<template>
  <div style="margin: 10px;">
    <div>
      <el-tabs
        v-model="activeName"
        type="border-card"
        @tab-click="handleClick"
      >
        <!-- 到店确认 -->
        <el-tab-pane
          v-if="checkShwo(['R1004'])"
          :label="labelName.test"
          name="first1"
        >
          <Tab
            :reach-check="reachCheck"
            :loading="loading"
            :check-type="checkName.reach"
            :status="statusName.reach"
            :click-type="checkFuntion.reach"
          />
        </el-tab-pane>
        <!-- 收款确认 -->
        <el-tab-pane
          v-if="checkShwo(['R1001','R1002','R1003'])"
          :label="labelName.test1"
          name="first"
        >
          <Tab
            :reach-check="gatheringCheck"
            :loading="loading"
            :check-type="checkName.gathering"
            :status="statusName.gathering"
            :click-type="checkFuntion.gathering"
          />
        </el-tab-pane>
        <!-- 安装确认 -->
        <el-tab-pane
          v-if="checkShwo(['R1004'])"
          :label="labelName.installLabel"
          :name="nameName.installName"
        >
          <Tab
            :reach-check="installCheck"
            :loading="loading"
            :check-type="checkName.install"
            :status="statusName.install"
            :click-type="checkFuntion.install"
            :inventoryMsg="inventoryMsg"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
</div>
</template>

<script>

import Tab from './components/tab'
export default {
  components: { Tab },
  data() {
    return {
      labelName: {
        test: '到店确认',
        test1: '收款确认',
        installLabel: '安装确认',
        test2: 'treachCheck(scope.$index,scope.row)',
        test3: this.reachCheck
      },
      nameName: {
        test: 'ccc',
        test1: '收款确认1',
        installName: '安装确认'
      },
      statusName: {
        reach: '进行中',
        gathering: '收款中',
        install: '安装中'
      },
      checkName: {
        reach: '到店确认',
        gathering: '收款确认',
        install: '安装确认'
      },
      checkFuntion: {
        reach: 'tReachCheck',
        gathering: 'tGatheringCheck',
        install: 'tInstallCheck'
      },

      // 当前登陆用户信息
      user: '',
      // 待收款确认信息
      gatheringCheck: [],
      // 待到店确认单据
      reachCheck: [],
      // 待安装确认单据
      installCheck: [],
      // 数据加载
      loading: true,
      queryDate: {
        value1: '2020-01-01',
        value2: '2020-01-24'
      },
      activeName: 'first',
      // 库存信息
      inventoryMsgAll: [],
      inventoryMsg: [],
      // iccid信息集
      iccids: [],
      iccid: []
    }
  },
  created() {
    this.getDate()
    console.log('用户信息')
    console.log(this.$store.state)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getDate() {
      this.$store.dispatch('sell/reachCheckMsg').then(res => {
        this.user = res.user
        this.gatheringCheck = res.gatheringCheck
        this.reachCheck = res.reachCheck
        this.installCheck = res.installCheck
        this.loading = false
        this.inventoryMsgAll = res.inventoryMsg
        // 处理设备信息。 品牌-型号-id
        if(res.inventoryMsg != null ){
          this.inventoryMsgAll.forEach(item => {
            if(item.awaitInstall > 0){
              this.inventoryMsg.push({id:item.equipmentMsgId,value:item.equipmentMsg.equipmentBrand+'-'+item.equipmentMsg.equipmentTypeNum+'-'+item.equipmentMsg.size+'(余:'+item.awaitInstall+'台)'})
            }
          })
          this.iccids = res.iccids
        }
        
        // 获取iccid集
        
        // 品牌信息
        // let e = []
        // this.equipmentMsgAll.forEach(item => {
        //   e.push(item.equipmentBrand)
        // })
        // e = Array.from(new Set(e))
        // e.forEach(item => {
        //   this.equipmentMsg.push({value:item,label:item,children:[]})
        // })
        // this.equipmentMsg.forEach(item => {
        //   this.equipmentMsgAll.forEach(i => {
        //     if(item.value == i.equipmentBrand){
        //       item.children.push({value:i.equipmentTypeNum,label:i.equipmentTypeNum,children:[]})
        //     }
        //   })
        // })
        // this.equipmentMsg.forEach(item => {
        //   item.children.forEach(i => {
        //     this.equipmentMsgAll.forEach(j => {
        //       if(j.equipmentBrand == item.value && j.equipmentTypeNum == i.value){
        //         i.children.push({value:j.size,label:j.size})
        //       }
        //     })
        //   })
        // })
        console.log('123')
        console.log(this.$data)



      })
    },
    treachCheck(index, row) {
      const checkData = { id: row.id, type: 'reachCheck', data: { time: '' }}
      checkData.data.time = Date.parse(new Date())
      this.$store.dispatch('sell/reachCheck', checkData).then(res => {
        // 删除某行数据
        this.reachCheck.splice(index)
        this.popup(res.type, res.message)
      })
    },
    popup(type, msg) {
      this.$message({
        tyoe: type,
        message: msg
      })
    },
    checkShwo(str) {
      console.log(str)
      if (str.includes(this.user.roleNum)) {
        if (str.includes('R1004')) {
          this.activeName = 'first1'
        } else {
          this.activeName = 'first'
        }
        return true
      } else {
        false
      }
    }

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
</style>
