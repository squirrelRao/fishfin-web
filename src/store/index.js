import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: "",
    possword: ""
  },
  mutations: {
    login(state, user) {
      if (user["account"]) state.account = user["account"];
      if (user["possword"]) state.possword = user["possword"];
    }
  },
  actions: {
    login(context, user) {
      context.commit("login", user);
    }
  },
  modules: {}
});
