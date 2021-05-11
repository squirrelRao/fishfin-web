<template>
  <div id="app">
  <el-container>
  <el-header></el-header>
  <el-main><router-view></router-view></el-main>
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

</style>
<script>
export default {
  name: 'app',
  methods:{

    toIndex:function(){

      this.$router.push({"name":"index"});
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
