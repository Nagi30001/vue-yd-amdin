<template >
  <div>
  <el-button type="primary" plain size="small" style="margin: 5px;" icon="el-icon-circle-plus" @click="openDialog()">新增用户</el-button>
  <el-table
    size="mini"
    :data="users.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      width="80px"
      label="工号"
      prop="jobNum">
    </el-table-column>
    <el-table-column
      width="80px"
      label="用户名"
      prop="userName">
    </el-table-column>
    <el-table-column
      width="100px"
      label="电话"
      prop="phone">
    </el-table-column>
    <el-table-column
      width="100px"
      label="省份"
      prop="province">
    </el-table-column>
    <el-table-column
      width="100px"
      label="城市"
      prop="city">
    </el-table-column>
    <el-table-column
      width="100px"
      label="角色"
      >
      <template slot-scope="scope">
        <span>{{checkRole(scope.row.roleNum)}}</span>
      </template>
    </el-table-column>
    <el-table-column
      width="100px"
      label="创建人"
      prop="user.userName">
    </el-table-column>
    <el-table-column
      width="100px"
      label="状态"
      prop="status">
      <template slot-scope="scope">
        <el-tag type="success" size="small" v-show="checkStatus(scope.row.status)">启用</el-tag>
        <el-tag type="danger" size="small" v-show="!checkStatus(scope.row.status)">禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      width="100px"
      label="创建时间"
      prop="createTime">
    </el-table-column>
    <el-table-column
      label="地址"
      prop="address">
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
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
<!--        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">禁用</el-button> -->
      </template>
    </el-table-column>
  </el-table>

  <!-- 新增用户/修改用户-对话框 -->
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible" @closed="handleClose" >
    <el-form ref="dataFormJobNum" status-icon :model="userMsg" style="width: 1600px;" :rules="rules"  >
      <el-form-item label="工号:" :label-width="formLabelWidth" prop="jobNum" v-show="!checkPattern" ref="jobNum">
        <el-input v-model="userMsg.jobNum" autocomplete="off" style="width: 200px;"  ></el-input>
      </el-form-item>
    </el-form>
    <el-form ref="dataForm" status-icon :model="userMsg" style="width: 1600px;" :rules="rules"  >

      <el-form-item label="工号:" :label-width="formLabelWidth"  v-show="checkPattern" >
        <el-input v-model="userMsg.jobNum" autocomplete="off" style="width: 200px;" disabled></el-input>
      </el-form-item>


      <el-form-item label="密码:" :label-width="formLabelWidth" prop="jobPassword">
        <el-input v-model="userMsg.jobPassword" autocomplete="off" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="用户名:" :label-width="formLabelWidth" prop="userName">
        <el-input v-model="userMsg.userName" autocomplete="off" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="电话号码:" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="userMsg.phone" autocomplete="off" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="状态:" :label-width="formLabelWidth" v-show="checkPattern">
        <el-checkbox v-model="userMsg.status1" :disabled="userMsg.status0">启用</el-checkbox>
        <el-checkbox v-model="userMsg.status0" :disabled="userMsg.status1">禁用</el-checkbox>
      </el-form-item>
      <el-form-item label="省份:" :label-width="formLabelWidth" prop="province">
        <el-select v-model="userMsg.province" @blur="clearCity()" placeholder="请选择用归属地" style="width: 200px;">
          <el-option
            v-for="item in province"
            :label="item.province"
            :value="item.province"
            :key="item.province">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市:" :label-width="formLabelWidth" prop="city">
        <el-select v-model="userMsg.city" @focus="getCity()" placeholder="请选择用归属地" style="width: 200px;">
          <el-option
            v-for="item in cities"
            :label="item.city"
            :value="item.city"
            :key="item.city">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色:" :label-width="formLabelWidth" prop="roleNum">
        <el-select v-model="userMsg.roleNum"  placeholder="请选择用户角色" style="width: 200px;">
          <el-option
            v-for="item in roles"
            :label="item.roleName"
            :value="item.roleNum"
            :key="item.roleNum">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址:" :label-width="formLabelWidth" prop="address">
        <el-input v-model="userMsg.address" autocomplete="off" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="归属权限:" :label-width="formLabelWidth" prop="beProvince">
          <el-select
            v-model="userMsg.beProvince"
            multiple
            collapse-tags
            style="width: 200px;"
            placeholder="请选择用户负责区域">
            <el-option
              v-for="item in province"
              :key="item.province"
              :label="item.province"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('dataForm')">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
  import {isPhone} from '@/utils/validate'
  // 手机号码检验
  let checkPhone = (rule,value,callback) => {
    if (!isPhone(value)){
      return callback(new Error('请输入正确手机号码'))
      }
      callback()
  }
  const status = [{key:1,label:'启用'},{key:0,label:'禁用'}]
  export default{
    data(){
        let checkJobNum = (rule,value,callback) => {
          //检查工号位数
          if(value.length != 6){
            return callback(new Error('请检查工号长度!'))
          }
          this.$store.dispatch('user/checkJobNum',value).then(res => {
            if(res.res == 'No'){
             return callback(new Error('工号已被占用!'))
            }
            callback()
          })

        }
      return {
        status,
        //  检查电话好嘛
        checkPhone,
        search: '',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        // true=update false=add
        checkPattern: false,
        userMsg:{
          jobNum:'',
          jobPassword:'',
          userName:'',
          phone:'',
          province:'',
          city:'',
          roleNum:'',
          address:'',
          beProvince:[],
          status0:false,
          status1:false
        },
        cities:[],
        rules: {
          jobNum: [
            {required: true, validator: checkJobNum, trigger: 'blur'}
          ],
          jobPassword: [{required: true, message: '请填写用户密码', trigger: 'blur'}],
          userName: [{required: true, message: '请填写用户姓名', trigger: 'blur'}],
          phone: [{required: true, validator: checkPhone, trigger: 'blur'}],
          province: [{required: true, message: '请选择用户省份', trigger: 'blur'}],
          city: [{required: true, message: '请选择用户城市', trigger: 'blur'}],
          roleNum: [{required: true, message: '请选择用户角色', trigger: 'blur'}],
          address: [{required: true, message: '请填写地址,没有填‘无’ ', trigger: 'blur'}],
          beProvince: [{required: true, message: '请选择用户负责区域', trigger: 'blur'}],

        }
      }
  },
    name:'tab',
    props:{
      users:{
        type:Array
      },
      loading:false,
      province:{
        type:Array
      },
      citiesAll:{
        type:Array
      },
      roles:{
        type:Array
      }
    },
    methods:{
      // 更新信息
      handleEdit(index, row) {
        this.userMsg.status1 = false
        this.userMsg.status0 = false
        this.dialogFormVisible = true
        this.checkPattern = true
        this.userMsg.jobNum = row.jobNum,
        this.userMsg.jobPassword = row.jobPassword,
        this.userMsg.userName = row.userName,
        this.userMsg.phone = row.phone,
        this.userMsg.province = row.province,
        this.userMsg.city = row.city,
        this.userMsg.roleNum = row.roleNum,
        this.userMsg.address = row.address,
        this.userMsg.beProvince = row.beProvinces
        if(row.status == 1){
          this.userMsg.status1 = true
        } else {
          this.userMsg.status0 = true
        }



        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      checkRole(role){
        console.log(role)
        if(role == 'R1001'){
          return '超级管理员'
        } else if(role == 'R1002'){
          return '管理员'
        } else if(role == 'R1003'){
          return '销售员'
        } else if(role == 'R1004'){
          return '平台用户'
        } else if(role == 'R1005'){
          return '优道平台'
        } else {
          return '无?'
        }
      },
      // 检查状态
      checkStatus(row){
        if(row == 1){
          return true
        } else {
          return false
        }
      },
      // 新增用户
      openDialog(){
        this.dialogFormVisible = true
        this.checkPattern = false
        this.clearUserMsg()
      },
      // 清除city数据
      clearCity(){
        this.cities = []
        this.userMsg.city = ''
      },
      // 城市获得焦点后执行
      getCity(){
        console.log(111)
        this.cities = []
        //根据省份名称获取省份id
        if(this.userMsg.province != '' && this.userMsg.province != null){
          console.log(222)
          let provinceId = 0
          for(var i=0;i<this.province.length;i++){
            if(this.userMsg.province == this.province[i].province){
              provinceId = this.province[i].id
            }
          }
          console.log(333)
          console.log(provinceId)
          for(var i=0;i<this.citiesAll.length;i++){
            if(provinceId == this.citiesAll[i].provinceId){
              this.cities.push(this.citiesAll[i])
            }
          }
        }

      },

      handleClose(){

        this.clearUserMsg()
        // 清除验证
        this.$refs['dataForm'].resetFields()


      },
      cancelDialog(){
        this.dialogFormVisible = false

        this.clearUserMsg()

        this.$refs['dataForm'].resetFields()
      },
      clearUserMsg(){
        this.userMsg.jobNum = '',
        this.userMsg.jobPassword = '',
        this.userMsg.userName = '',
        this.userMsg.phone = '',
        this.userMsg.province = '',
        this.userMsg.city = '',
        this.userMsg.roleNum = '',
        this.userMsg.address = '',
        this.userMsg.beProvince = []
      },
      // 添加用户
      addUser(){
        console.log('第二步')
        this.$store.dispatch('user/addUser',this.userMsg).then(res => {
          this.cancelDialog()
          this.users.unshift(res.user)
          this.$message({
            type:'success',
            message: '新增用户成功'
          })
        })
      },
      // 更新用户
      updateUser(){
        this.$store.dispatch('user/updateUser',this.userMsg).then(res => {
          // 刷新当前页面
          this.$router.go(0)
        })
      },
      checkJobNumNet(value){
        this.$store.dispatch('user/checkJobNum',value).then(res => {
          if(res.res == 'No'){
           return true
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.$data)
            if(this.checkPattern){
              this.updateUser()
            } else {
              this.addUser()
            }

          } else {
            console.log('error submit!!')
            console.log(this.$data)
            return false;
          }
        });
      },
  }
}
</script>

<style>
</style>
