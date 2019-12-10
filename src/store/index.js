import Vue from 'vue'
import Vuex from 'vuex'
import gameStatistics from '../utils/gameStatistics'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    menuIndex: 0,
    updated: false,  // 记录统计信息是否已经从localStorage更新到Vuex
    statisticsData: {
      grabThirty: {
        victory: 0,
        fail: 0,
        runaway: 0
      },
      pushThirty: {
        victory: 0,
        fail: 0,
        runaway: 0
      }
    }
  },
  mutations: {
    SET_MENU_INDEX (state, menuIndex) {
      state.menuIndex = menuIndex;
    },
    UPDATE_STATISTICS_INFO(state, type) {
      switch (type) {
        case 0:
          state.statisticsData.grabThirty.victory += 1;
          state.statisticsData.grabThirty.runaway -= 1;
          break;
        case 1:
          state.statisticsData.grabThirty.fail += 1;
          state.statisticsData.grabThirty.runaway -= 1;
          break;
        case 2:
          state.statisticsData.grabThirty.runaway += 1;
          break;
        case 3:
          state.statisticsData.pushThirty.victory += 1;
          state.statisticsData.pushThirty.runaway -= 1;
          break;
        case 4:
          state.statisticsData.pushThirty.fail += 1;
          state.statisticsData.pushThirty.runaway -= 1;
          break;
        case 5:
          state.statisticsData.pushThirty.runaway += 1;
          break;
      }
      gameStatistics.set(state.statisticsData);
    },
    INIT_STATISTICS_INFO(state, data) {
      if (data != null) {
        state.statisticsData = data;
      }
    }
  },
  actions: {
    SetMenuIndex ({commit}, menuIndex) {
      commit('SET_MENU_INDEX', menuIndex);
    },
    /**
     * 更新游戏统计信息
     * @param type  0 抢三十胜利
     *              1 抢三十失败
     *              2 抢三十逃跑
     *              3 推三十胜利
     *              4 推三十失败
     *              5 推三十逃跑
     */
    UpdateStatisticsInfo({commit}, type) {
      commit('UPDATE_STATISTICS_INFO', type);
    },
    /**
     * 初始化游戏数据
     */
    InitStatisticsInfo({commit}, data) {
      commit('INIT_STATISTICS_INFO', data);
    }
  }
});

export default store
