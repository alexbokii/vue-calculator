import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// Vuex modules
import calculator from "@/store/calculator";

const store = new Vuex.Store({
  // Don't use strict mode in production for performance reasons (https://vuex.vuejs.org/guide/strict.html)
  strict: process.env.NODE_ENV !== "production",
  modules: {
    calculator,
  },
  state: {},
  actions: {},
  getters: {},
});

export default store;
