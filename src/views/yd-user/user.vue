<template>
  <el-tabs type="border-card" style="margin: 10px;" >
    <el-tab-pane label="优道用户">
      <Tab :users="ydUser" :loading="loading" :province="province" :citiesAll="citiesAll" :roles="roles"></Tab>
    </el-tab-pane>
    <el-tab-pane label="平台用户">
      <Tab :users="ptUser" :loading="loading" :province="province" :citiesAll="citiesAll" :roles="roles"></Tab>
    </el-tab-pane>

  </el-tabs>
</template>



<script>
  import Tab from './components/tab.vue'
  export default {
    components:{
      Tab
    },
    data() {
      return{
        user:'',
        ydUser:[],
        ptUser:[],
        province:[],
        citiesAll:[],
        cities:[],
        loading:false,
        roles:[]
      }
    },
    methods: {
      getData(){
        this.$store.dispatch('user/getUsers').then(res => {
          this.user = res.user
          this.ydUser = res.ydUsers
          this.ptUser = res.ptUsers
          this.province = res.provinces
          this.citiesAll = res.cities
          this.roles = res.roles
          console.log(this.$data)
        })
      },
      getCity(){
      
      }

    },
    created() {
      this.getData()
    }
  }
</script>
