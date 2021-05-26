<template>
  <div id="index" class="index_main">
      <el-row align="middle" type="flex">
        <el-col span=1></el-col>
        <el-col span=22>
              <el-row align="middle" type="flex" >
                <el-col>
                  <div class="grid-content"><el-image :src="require('@/assets/logo.png')" style="width:210px;cursor:Pointer"></el-image></div>
                  <div class="grid-slogon-content">{{welcome}}</div>
                  <div class="grid-content"><el-button round @click="enter">进入鱼鳍</el-button></div>
                </el-col>
              </el-row>
        </el-col>
        <el-col span=1></el-col>
    </el-row>
    </div>
</template>
<style>
.index_main{
  height: 400px;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: auto;
  margin-right: auto;
  margin-bottom:180px;

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
  data() {
    return {
      welcome: '感知水流，保持平衡'
    }
  },
  mounted(){

    this.showWelcome()

  },
  methods:{
    showWelcome:function(){
        console.log(this.$store.getters.isLogin);
        if(this.$store.getters.isLogin==false){
          this.welcome = "感知水流，保持平衡";
        }else{
          this.welcome = "欢迎 "+this.$store.state.name+" ~";
        }

    },
    enter:function(){
      
      if(this.$store.getters.isLogin == false){
        console.log(this.$store.getters.isLogin);
        this.$router.push( { name: "login"});
      }else{
        this.$message({
          showClose: true,
          message: this.$store.state.name+" 欢迎进入鱼鳍！",
          type: "success"
        });
        this.$router.push({"name":"center"});
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
