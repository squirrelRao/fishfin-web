import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
     user_id:'',
     name:''
  },
  mutations: {

    login_callback(data){
      state.user_id = data["user_id"];
      state.name = data["name"];
    }
    
  },
  getters:{
    isLogin: user_id == '' ? false : true    
  },
  actions: {
   
    login(context, phone,code) {

      axios.post("/v1/login",{"phone":phone,"code":code}).then(res => {
        console.log(res);
        this.$message({
          showClose: true,
          message: res["data"],
          type: "success"
        });
        if(res["rc"] == 0){

          expire = new Date().getTime() + 3688 * 24 * 10;
          localStorage.setItem("user",JSON.stringify({"user_id":res["data"]["user_id"],"name":res["data"]["name"],"expire":expire}));
          context.commit("login_callback", res["data"]);
        
        }else{
          this.$message({
            showClose: true,
            message: res["msg"],
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

     
    }
  },
  modules: {}
});

export default store;
