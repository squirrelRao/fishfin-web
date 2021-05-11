<template>
  <div id="login" class="main">
      <el-row align="middle" type="flex">
        <el-col :span="6"></el-col>
        <el-col :span="12">
              <el-row align="middle" type="flex" >
                <el-col>
                  <div class="grid-content"><el-image :src="require('@/assets/logo.png')" style="width:210px;cursor:Pointer" @click="toIndex"></el-image></div>
                </el-col>
              </el-row>
              <el-row align="middle"  type="flex" >
                <el-col :span="8"></el-col>
                <el-col :span="8">
                  <div class="grid-slogon-content">手机号: <el-input v-model="phone" placeholder="请输入手机号" style="width:200px"/></div>
                </el-col>
                <el-col :span="2"></el-col>
              </el-row>
               <el-row align="middle"  type="flex" >
                 <el-col :span="8"></el-col>
                <el-col :span="8">
                  <div class="grid-slogon-content">验证码: <el-input v-model="code" placeholder="请输入验证码" style="width:200px"/>
                  </div>
                </el-col>
                 <el-col :span="2"><el-link type="primary">获取验证码</el-link></el-col>
              </el-row>
              <el-row align="middle"  type="flex" >
                 <el-col :span="10"></el-col>
                <el-col :span="3">
                  <div class="grid-slogon-content"><div class="grid-content" style="margin-top:20px"><el-button plain @click="enter">登 录</el-button></div>
                  </div>
                </el-col>
                 <el-col :span="2"><el-link type="info" class="regist_tip">没有账号?</el-link></el-col>
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

.regist_tip {
  text-align: center;
  font-weight: bold;
  font-size: 10px;
  margin-top:10px;
}

</style>
<script>
export default {
  name: 'login',
  data() {
    return {
      phone: '',
      code:''
    }
  },
  mounted:{

  },
  methods:{
    toIndex:function(){
      this.$router.push({"path":"/"});
    },
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
console.log("hi");
</script>

<style>

</style>
