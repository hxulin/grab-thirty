import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    menuIndex: 0
  },
  mutations: {
    SET_MENU_INDEX (state, menuIndex) {
      state.menuIndex = menuIndex;
    }
  },
  actions: {
    SetMenuIndex ({commit}, menuIndex) {
      commit('SET_MENU_INDEX', menuIndex);
    }
  }
});

export default store