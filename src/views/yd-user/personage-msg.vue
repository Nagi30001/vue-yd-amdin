<template>
  <el-card class="box-card" style="margin: 3px;">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="openDialog()">修改密码</el-button>
    </div>
    <div>
      <el-form :model="user" ref="user">
        <el-form-item label="工号:" :label-width="labelWidth" style="margin: 0px;">
          <span>{{user.jobNum}}</span>
        </el-form-item>
        <el-form-item label="用户名:" :label-width="labelWidth" style="margin: 0px;">
          <span>{{user.userName}}</span>
        </el-form-item>
        <el-form-item label="省份:" :label-width="labelWidth" style="margin: 0px;">
          <span>{{user.province}}</span>
        </el-form-item>
        <el-form-item label="城市:" :label-width="labelWidth" style="margin: 0px;">
          <span>{{user.city}}</span>
        </el-form-item>
        <el-form-item label="电话号码:" :label-width="labelWidth" style="margin: 0px;">
          <span>{{user.phone}}</span>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="400px">
        <el-form :model="updateUserMsg" ref="updateUserMsg">
          <el-form-item label="旧密码:" label-width="90px">
            <el-input type="password" v-model="updateUserMsg.oldPassword" style="width: 200px; margin: 0;"></el-input>
          </el-form-item>
          <el-form-item label="新密码:" label-width="90px">
            <el-input type="password" v-model="updateUserMsg.newPassword" style="width: 200px; margin: 0;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="clearUserMsg()">取 消</el-button>
          <el-button type="primary" @click="updateUser()">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </el-card>



</template>

<script>
  export default {
    data(){
      return {
        // 密码更改对话框
        dialogVisible:false,
        user:'',
        labelWidth: '80px',
        updateUserMsg:{
          id: '',
          oldPassword:'',
          newPassword:'',
          phone:'',

        }
      }
    },
    methods:{
      // 初始化信息，个人信息/
      getData(){
        this.user = this.$store.state.user.userMsg
      },
      // 打开修改密码对话框
      openDialog(){
        this.resetUpdateUserMsg()
        this.dialogVisible = true
      },
      // 取消对话框
      clearUserMsg(){
        this.resetUpdateUserMsg()
        this.dialogVisible = false
      },
      // 更新对话框信息
      updateUser(){
        this.updateUserMsg.id = this.user.id
        this.$store.dispatch('user/updatePassword',this.updateUserMsg).then(res => {
          // 成功 退出系统
        this.$store.dispatch('user/logout').then(res => {
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        })
        
          // this.$router.go(0)
        }).catch(error => {
          this.$message({
            type:'danger',
            message: error.message
          })
          // console.log(error)
          // console.log(error.message)
        })
      },
      // 重置updateUserMsg信息
      resetUpdateUserMsg(){
        this.updateUserMsg = {
          id: '',
          oldPassword:'',
          newPassword:'',
          phone:'',
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
