<template>
  <div id="head">
      <el-row align="middle" type="flex" :gutter="20">
        <el-col span="3"><el-image :src="require('@/assets/logo.png')" style="width:128px;cursor:Pointer"></el-image></el-col>
        <el-col span="5">
          <el-menu :default-active="activeIndex" mode="horizontal" @select="onSelect" active-text-color="#008080">
            <el-menu-item index="1">关注自选</el-menu-item>
            <el-menu-item index="2">模拟交易</el-menu-item>
          </el-menu>
        </el-col>
        <el-col span="3" :offset="13"><el-link type="info" style="font-size:18px;margin-left:30px" icon="el-icon-user">134****3248</el-link></el-col>
    </el-row>
    </div>
</template>
<style>
.el-menu.el-menu--horizontal {
  border-bottom-color:#ffffff!important;
  border-bottom: none;
  line-height: 0rem;
  text-align: center;
}
.el-menu--horizontal > .el-menu-item.is-active {
    border-bottom-color:#ffffff!important;
  border-bottom: none;
  font-weight: bold;
  font-size:18px;
}
</style>
<script>
export default {
  name: 'head',
   data() {
      return {
        activeIndex: '1',
      };
    },
  methods:{
    onSelect:function(index){
      this.activeIndex = index;
      console.log(this.activeIndex);
      if(this.activeIndex == "1"){
        this.$router.push({"name":"center"});
      }else{
        this.$router.push({"name":"simulation"});
      }
      // this.$router.push({"name":"center"});
    },
    enter:function(){
      
      if(this.$store.getters.isLogin == false){
        console.log(this.$store.getters.isLogin);
        this.$router.push( { name: "login"});
      }else{
        this.$message({
          showClose: true,
          message: this.$store.state.name,
          type: "success"
        });
      }

    },
    reqHttp: function() {
     
      this.$api.http("/", "get", {}).then(res => {
        console.log(res);
        this.$message({
          showClose: true,
          message: res["data"],
          type: "success"
        });
      }).catch(err => {
        console.log(err);
        this.$message({
          showClose: true,
          message: "",
          type: "error"
        });
      });
    }
    
  }
}
</script>

<style>


</style>
