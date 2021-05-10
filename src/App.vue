<template>
  <div id="app">
    <el-container>
  <el-header></el-header>
  <el-main class="main">
    <div>
      <el-row align="middle" type="flex">
        <el-col :span="6"></el-col>
        <el-col :span="12">
              <el-row align="middle" type="flex" >
                <el-col>
                  <div class="grid-content"><el-image :src="require('@/assets/logo.png')" :fit="fit" style="width:210px"></el-image></div>
                  <div class="grid-slogon-content">欢迎光临</div>
                  <div class="grid-content"><el-button round>进入鱼鳍</el-button></div>
                </el-col>
              </el-row>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
    </div>
  </el-main>
  <el-footer></el-footer>
</el-container>
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
  name: 'app',
  methods:{
    hi(){
        this.reqHttp()
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
