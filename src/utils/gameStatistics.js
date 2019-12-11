import storage from './storage'

const game_statistics_key = 'game_statistics_data';

let statisticsData = {
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
};

const gameStatistics = {
  get() {
    return storage.get(game_statistics_key) || statisticsData;
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
  update(type) {
    if (type >= 0 && type <= 5) {
      let data = this.get();
      switch (type) {
        case 0:
          data.grabThirty.victory += 1;
          data.grabThirty.runaway -= 1;
          break;
        case 1:
          data.grabThirty.fail += 1;
          data.grabThirty.runaway -= 1;
          break;
        case 2:
          data.grabThirty.runaway += 1;
          break;
        case 3:
          data.pushThirty.victory += 1;
          data.pushThirty.runaway -= 1;
          break;
        case 4:
          data.pushThirty.fail += 1;
          data.pushThirty.runaway -= 1;
          break;
        case 5:
          data.pushThirty.runaway += 1;
          break;
      }
      storage.set(game_statistics_key, data);
    }
  },
  // 获取统计图数据
  getChartData() {

  },
  // 获取统计表数据
  getPieData() {

  }
};

export default gameStatistics;
