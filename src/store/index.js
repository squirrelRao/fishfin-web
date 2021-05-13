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
      this.state.user_id = data["user_id"];
      this.state.name = data["name"];
    },
    getUserState(){
      let data = localStorage.getItem("user");
      if(data == null){
        return;
      }
      data = JSON.parse(data);
      this.state.user_id = data["user_id"];
      this.state.name = data["name"];
      console.log(this.state);
  }
    
  },
  getters:{
    isLogin(state){
      let res = state.user_id == '' ? false : true;
      return res
    }
  },
  actions: {
    
  },
  modules: {}
});

export default store;
