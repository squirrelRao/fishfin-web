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
              <el-row align="middle" type="flex" >
               <el-col :span="8"></el-col>
                <el-col :span="8">
                  <div class="grid-slogon-content">登 录
                  </div>
                </el-col>
                 <el-col :span="2"></el-col>
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
                  <div class="grid-slogon-content"><div class="grid-content" style="margin-top:20px"><el-button plain @click="login">登 录</el-button></div>
                  </div>
                </el-col>
                 <el-col :span="2"><el-link type="info" class="regist_tip" @click="toRegist">没有账号?</el-link></el-col>
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
      code:'123456'
    }
  },
  mounted:{

  },
  methods:{
    valid:function(){

      if(this.phone == ''){
          this.$message({
          showClose: true,
          message: "手机号有误",
          type: "error"
        });
        return false;
      }

      return true;

    },
    login:function(){

      if(this.valid() == false){
        return;
      }

      this.$api.http("/v1/login","post",{"phone":this.phone,"code":this.code}).then(res => {
        console.log(res);
      
        if(res["rc"] == 0){
        this.$message({
                    showClose: true,
                    message: "欢迎进入鱼鳍！",
                    type: "success"
           });
          let expire = new Date().getTime() + 3688 * 24 * 10;
          localStorage.setItem("user",JSON.stringify({"user_id":res["data"]["user_id"],"name":res["data"]["name"],"expire":expire}));
          this.$store.commit("login_callback", res["data"]);
          this.$router.push({"name":"center"});
         

        
        }else{
          this.$message({
            showClose: true,
            message: "登录失败:请检查手机号或验证码是否正确",
            type: "error"
          });
        }

      }).catch(err => {
        console.log(err);
        this.$message({
          showClose: true,
          message: "req failure",
          type: "error"
        });
      });


    },
    toRegist:function(){
      this.$router.push({"name":"regist"});
    },
    toIndex:function(){
      this.$router.push({"path":"/"});
    },
    enter(){
        this.$router.push({"name":"center"});
    }
  }
}
</script>

<style>

</style>
