<template>
  <div id="regist" class="main">
      <el-row align="middle" type="flex">
        <el-col span="6"></el-col>
        <el-col span="12">
              <el-row align="middle" type="flex" >
                <el-col>
                  <div class="grid-content"><el-image :src="require('@/assets/logo.png')" style="width:210px;cursor:Pointer" @click="toIndex"></el-image></div>
                </el-col>
              </el-row>
              <el-row align="middle" type="flex" >
               <el-col span="8"></el-col>
                <el-col span="10">
                  <div class="grid-slogon-content">注 册
                  </div>
                </el-col>
                 <el-col span="2"></el-col>
              </el-row>
              <el-row align="middle"  type="flex" >
                <el-col span="8"></el-col>
                <el-col span="10">
                  <div class="grid-slogon-content"><font style="color:red">*</font>手机号: <el-input v-model="phone" placeholder="请输入手机号" style="width:200px"/></div>
                </el-col>
                <el-col span="2"></el-col>
              </el-row>
               <el-row align="middle"  type="flex" >
                 <el-col span="8"></el-col>
                <el-col span="10">
                  <div class="grid-slogon-content"><font style="color:red">*</font>邮 箱: <el-input v-model="mail" placeholder="请输入常用邮箱" style="width:200px;margin-left:10px"/>
                  </div>
                </el-col>
              </el-row>
               <el-row align="middle"  type="flex" >
                 <el-col span="8"></el-col>
                <el-col span="10">
                  <div class="grid-slogon-content">昵 称: <el-input v-model="name" placeholder="请输入昵称" style="width:200px;margin-left:10px"/>
                  </div>
                </el-col>
                 <el-col span="2"></el-col>
              </el-row>
               <el-row align="middle"  type="flex" >
                 <el-col span="8"></el-col>
                <el-col span="10">
                  <div class="grid-slogon-content"><font style="color:red">*</font>邀请码: <el-input v-model="code" placeholder="请输入邀请码" style="width:200px"/>
                  </div>
                </el-col>
                 <el-col span="2"><el-link type="primary"></el-link></el-col>
              </el-row>
              <el-row align="middle"  type="flex">
                 <el-col span="10"></el-col>
                <el-col span="4">
                  <div class="grid-slogon-content"><div class="grid-content" style="margin-top:20px"><el-button plain @click="regist">提 交</el-button></div>
                  </div>
                </el-col>
                 <el-col span="2"><el-button plain @click="back">取 消</el-button></el-col>
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
  name: 'regist',
  data() {
    return {
      phone: '',
      mail:'',
      code:'',
      name:''
    }
  },
  mounted:{

  },
  methods:{
    toIndex:function(){
      this.$router.push({"path":"/"});
    },
    
    back(){
      this.$router.push({"name":"login"});
    },
    regist: function() {

      if(this.phone == '' || this.mail == "" || this.code == "" ){
        this.$message({
          showClose: true,
          message: "请输入必要信息再提交",
          type: "error"
        });
        return;
      }
     
      this.$api.http("/v1/regist", "post", {"phone":this.phone,"mail":this.mail,"name":this.name,"invite_code":this.code}).then(res => {
        console.log(res);
        if(res["rc"] == 0){
          this.$message({
          showClose: true,
          message: "注册成功！请前往登录...",
          type: "success"
        });
        this.back();
        return;

        }else if(res["rc"] == -1){
          this.$message({
          showClose: true,
          message: "手机号或邮箱已被注册!",
          type: "error"
        });
        
        }else if(res["rc"] == -2){

          this.$message({
          showClose: true,
          message: "邀请码无效!",
          type: "error"
        });
        }


      }).catch(err => {
        console.log(err);
        this.$message({
          showClose: true,
          message: "操作失败",
          type: "error"
        });
      });
    }
    
  }
}
</script>

<style>

</style>
