<template>
  <el-tabs type="border-card" style="margin-top: 30px;margin: 30px;">
    <el-tab-pane label="渠道管理">
  <div>
    <el-button type="primary" icon="el-icon-edit"  @click="dialogFormVisible = true">新增渠道</el-button>

  <el-table
    size="mini"
    stripe
    :data="channelMsgs.filter(data => !search || data.channelName.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%;" >
    <el-table-column
      label="id"
      prop="id">
    </el-table-column>
    <el-table-column
      label="省份"
      prop="province">
    </el-table-column>
    <el-table-column
      label="城市"
      prop="city">
    </el-table-column>
    <el-table-column
      label="渠道名称"
      prop="channelName">
    </el-table-column>
    <el-table-column
      label="地址"
      prop="site">
    </el-table-column>
    <el-table-column
      label="创建人"
      prop="user.userName">
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
      <template slot-scope="scope" >
        <el-button
          size="mini"
          v-show="checkUser(scope.$index, scope.row)"
          @click="handleEdit(scope.$index, scope.row)">修改信息</el-button>
<!--        <el-button
          size="mini"
          type="danger"
          v-show="checkRoles()"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>

  <!-- 新增或修改弹出的对话框 -->
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form :model="channelMsg">
      <el-form-item label="省份" :label-width="formLabelWidth">
        <el-select v-model="channelMsg.province" @blur="clearCity" placeholder="请选择活动区域" style="width: 200px;">
          <el-option
            v-for="item in provinces"
            :label="item.province"
            :value="item.province"
            :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <el-select v-model="channelMsg.city" @focus="getCity" placeholder="请选择活动区域" style="width: 200px;">
          <el-option
            v-for="item in cities"
            :label="item.city"
            :value="item.city"
            :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道名称" :label-width="formLabelWidth">
        <el-input v-model="channelMsg.channelName" autocomplete="off" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" >
        <el-input v-model="channelMsg.site" autocomplete="off" style="width: 200px;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="clearStatus">取 消</el-button>
      <el-button type="primary" @click="channelMsg.type === 'new' ? addChannel() : upadateChannel()">确 定</el-button>
    </div>
  </el-dialog>
  </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'roles',
      ]),

    },
    data() {
      return {
        user:'',
        channelMsgs:[],
        search: '',
        channelMsg: {
          id:'',
          province:'',
          city:'',
          channelName:'',
          site:'',
          type:'new'
        },
        dialogFormVisible: false,
        formLabelWidth: '120px',
        provinces:[],
        citiesAll:[],
        cities:[]

      }
    },

    methods: {
      getData(){
        this.$store.dispatch('data/getChannelMsg').then(res => {
          this.channelMsgs = res.channelMsgs
          this.provinces = res.provinces
          this.citiesAll = res.cities
          this.user = res.user
          console.log(this.$data)
        })

      },
      // 城市获得焦点后执行
      getCity(){
        this.cities = []
        // 根据省份名称获取省份id
        if(this.channelMsg.province != '' && this.channelMsg.province != null){
          let provinceId = 0
          for(var i=0;i<this.provinces.length;i++){
            if(this.channelMsg.province == this.provinces[i].province){
              provinceId = this.provinces[i].id
            }
          }

          for(var i=0;i<this.citiesAll.length;i++){
            if(provinceId == this.citiesAll[i].provinceId){
              this.cities.push(this.citiesAll[i])
            }
          }
        }
      },
      //  修改信息
      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.channelMsg.province = row.province
        this.channelMsg.city = row.city
        this.channelMsg.channelName = row.channelName
        this.channelMsg.site = row.site
        this.channelMsg.type = 'update'
        this.channelMsg.id = row.id

      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 添加渠道信息
      addChannel(){
        this.$store.dispatch('data/addChannel',this.channelMsg).then(res => {
          this.dialogFormVisible = false
          this.$message({
            message: '渠道信息添加成功',
            type: 'success'
          })
          // this.$router.go(0)
          this.channelMsgs.unshift(res.channel)
        })
      },
      //更新渠道信息
      upadateChannel(){
        this.$store.dispatch('data/updateChannel',this.channelMsg).then(res => {
          this.dialogFormVisible = false
          this.$message({
            message: '渠道信息更新成功',
            type: 'success'
          })
          // console.log(this.$data)
          this.$router.go(0)

        })
      },
      // 清除城市
      clearCity(){
        this.cities = []
        this.channelMsg.city = ''
        console.log("cities已清空")
      },
      clearStatus(){
        this.dialogFormVisible = false
        this.channelMsg.province = ''
        this.channelMsg.city = ''
        this.channelMsg.channelName = ''
        this.channelMsg.site = ''
        this.channelMsg.type = 'new'
      },
      checkRoles(){
        console.log('测试')
        console.log(this.roles)
        let test = this.roles.some(role => role.includes("R1001"))
        console.log(test)
        return test
      },
      // 检查是每行信息是否是该用户的
      checkUser(index,row){
        console.log(index)
        return row.user.id == this.user.id
        // return true

      }

    },

    // 渠道信息初始化
    created() {
      this.getData()
    }
  }
</script>
