<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button @click="hi">el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  methods:{
    hi(){
       this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
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
