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
               <el-col span="8"></el-col>
                <el-col span="10">
                  <div class="grid-slogon-content">登 录
                  </div>
                </el-col>
                 <el-col :span="2"></el-col>
              </el-row>
              <el-row align="middle"  type="flex" >
                <el-col span="8"></el-col>
                <el-col span="10">
                  <div class="grid-slogon-content">邮 箱: <el-input v-model="mail" placeholder="请输入邮箱" style="width:200px"/></div>
                </el-col>
                <el-col :span="2"></el-col>
              </el-row>
               <el-row align="middle"  type="flex" >
                 <el-col span="8"></el-col>
                <el-col span="10">
                  <div class="grid-slogon-content">验证码: <el-input v-model="code" placeholder="请输入验证码" style="width:200px"/>
                  </div>
                </el-col>
                 <el-col span="3"><el-link type="primary" @click="getLoginCode">获取验证码</el-link></el-col>
              </el-row>
              <el-row align="middle"  type="flex" >
                 <el-col span="10"></el-col>
                <el-col span="6">
                  <div class="grid-slogon-content"><div class="grid-content" style="margin-top:20px"><el-button plain @click="login">登 录</el-button></div>
                  </div>
                </el-col>
                 <el-col span="2"><el-link type="info" class="regist_tip" @click="toRegist">没有账号?</el-link></el-col>
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
      mail: '',
      code:''
    }
  },
  mounted:{

  },
  methods:{
    getLoginCode:function(){

       if(this.valid()==false){
         return
       }

       this.$api.http("/v1/login/code","post",{"mail":this.mail}).then(res => {
        console.log(res);
      
        if(res["rc"] == 0){
          this.$message({
                    showClose: true,
                    message: "登录验证码已发送往邮箱",
                    type: "success"
           });
          
        
        }else{
          this.$message({
            showClose: true,
            message: "邮箱有误，登录验证码无法发送",
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
    valid:function(){

      if(this.mail == ''){
          this.$message({
          showClose: true,
          message: "邮箱有误",
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

      this.$api.http("/v1/login","post",{"mail":this.mail,"code":this.code}).then(res => {
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
