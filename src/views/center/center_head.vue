<template>
  <div id="head">
      <el-row align="middle" type="flex" :gutter="20">
        <el-col span=3><el-image :src="require('@/assets/logo.png')" style="width:128px;cursor:Pointer" @click="toIndex"></el-image></el-col>
        <el-col span=5>
          <el-menu :default-active="activeIndex" mode="horizontal" @select="onSelect" active-text-color="#008080">
            <el-menu-item index="1">我的关注</el-menu-item>
            <el-menu-item index="2">模拟记录</el-menu-item>
          </el-menu>
        </el-col>
        <el-col span=10 offset=10>
             
         <el-autocomplete 
         size="small"
         clearable="true"
         highlight-first-item="true"
  v-model="state"
  :fetch-suggestions="querySearchAsync"
  placeholder="搜索并加入关注"
  popper-class="auto_input"
  @select="queryHandleSelect"><i slot="prefix" class="el-input__icon el-icon-search">  </i>
    <template slot-scope="{ item }">
      <div >
      <i class="el-icon-star-off" v-if="item.value.is_watch == 0" ></i><i class="el-icon-star-on" style="color:#f2b635" v-if="item.value.is_watch == 1" ></i><span style="margin-left:10px">{{item.value.currency}}</span>
      </div>
    </template>
  </el-autocomplete>  
          <el-dropdown size="medium" @command="clickDropdown">
          <el-link type="info" style="font-size:16px;margin-left:30px" icon="el-icon-user" >134****3248</el-link>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item icon="el-icon-turn-off" command="logout" >退 出</el-dropdown-item>
                </el-dropdown-menu>
          </el-dropdown>
          </el-col>
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
        state:'',
        query_symbol:[]
      };
    },
  methods:{
    queryHandleSelect(item) {

        console.log(item);
        if(item.value.is_watch == 1){
              this.$message({
              showClose: true,
              message: item.value.currency+"已在关注列表里",
              type: "success"
            });
        }else{
        
        this.$api.http("/v1/symbol/watch/add", "post", {"currency":item.value.currency,"quote":"usdt","user_id":this.$store.getters.user_id}).then(res => {
        if(res["rc"]==0){
          this.$alert(item.value.currency+"已添加到关注列表！", '操作成功', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload();
          }
        });


        }
        
      }).catch(err => {
        console.log(err);
        this.$message({
          showClose: true,
          message: "查询失败",
          type: "error"
        });
      });



        }
        this.state='';
    
    },
    querySearchAsync:function(queryString, cb){
      
      this.query_symbol = [];
      this.$api.http("/v1/symbol/query", "post", {"key":queryString,"user_id":this.$store.getters.user_id}).then(res => {
        console.log(res);
        if(res["rc"]==0){
          for(var i = 0; i < res["data"].length;i++){
            this.query_symbol.push({"value":res["data"][i]});
          }
        }

      }).catch(err => {
        console.log(err);
        this.$message({
          showClose: true,
          message: "查询失败",
          type: "error"
        });
      });


      return cb(this.query_symbol);
    },
    toIndex:function(){
      this.$router.push({"path":"/"});
    },
    clickDropdown:function(command){
      if(command == "logout"){
          this.logout()
      }
      
    },
    about:function(){
      
    },
    logout:function(){
        this.$store.commit("logout");
        this.$router.push({"path":"/"});
    },
    onSelect:function(index){
      this.activeIndex = index;
      console.log(this.activeIndex);
      if(this.activeIndex == "1"){
        this.$router.push({"name":"center"});
      }else{
        this.$alert('暂未开放', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            this.activeIndex = "1";
            this.$router.push({"name":"center"});
          }
        });
        // this.$router.push({"name":"simulation"});
      }
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
