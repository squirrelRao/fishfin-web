<template>
  <div id="app" >
  <el-container>
  <el-header><router-view name="header"></router-view></el-header>
  <el-main><router-view name="main"></router-view></el-main>
  <el-footer><router-view name="footer"></router-view></el-footer>
</el-container>
</div>
</template>
<style>

</style>
<script>
export default {
  name: 'app',
  methods:{

    toIndex:function(){

      this.$router.push({"name":"index"});
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
  margin-left: auto;
  margin-right: auto;
}
</style>
