<template>
  <div id="index" class="main">
      <el-row align="middle" type="flex">
        <el-col :span="6"></el-col>
        <el-col :span="12">
              <el-row align="middle" type="flex" >
                <el-col>
                  <div class="grid-content"><el-image :src="require('@/assets/logo.png')" style="width:210px;cursor:Pointer"></el-image></div>
                  <div class="grid-slogon-content">感知水流 保持平衡</div>
                  <div class="grid-content"><el-button round @click="enter">进入鱼鳍</el-button></div>
                </el-col>
              </el-row>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
    </div>
</template>
<style>
.main{
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.grid-content {
  text-align: center;
  font-weight: bold;

}
.grid-slogon-content {
  text-align: center;
  font-weight: bold;
  margin-bottom:20px;
  margin-top: 20px;
}

</style>
<script>
export default {
  name: 'index',
  methods:{
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
