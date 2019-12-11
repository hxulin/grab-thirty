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

let chartData = [
  { name: '获胜', type: '抢三十', value: 0 },
  { name: '败北', type: '抢三十', value: 0 },
  { name: '逃跑', type: '抢三十', value: 0 },
  { name: '获胜', type: '推三十', value: 0 },
  { name: '败北', type: '推三十', value: 0 },
  { name: '逃跑', type: '推三十', value: 0 },
  { name: '获胜', type: '合计', value: 0 },
  { name: '败北', type: '合计', value: 0 },
  { name: '逃跑', type: '合计', value: 0 }
];

let pieData = [
  { name: 'victory', text: '胜率', percent: 0, a: '1' },
  { name: 'fail', text: '败率', percent: 0, a: '1' },
  { name: 'runaway', text: '逃跑率', percent: 0, a: '1' }
];

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
    let data = this.get();
    chartData[0].value = data.grabThirty.victory;
    chartData[1].value = data.grabThirty.fail;
    chartData[2].value = data.grabThirty.runaway;
    chartData[3].value = data.pushThirty.victory;
    chartData[4].value = data.pushThirty.fail;
    chartData[5].value = data.pushThirty.runaway;
    chartData[6].value = data.grabThirty.victory + data.pushThirty.victory;
    chartData[7].value = data.grabThirty.fail + data.pushThirty.fail;
    chartData[8].value = data.grabThirty.runaway + data.pushThirty.runaway;
    return chartData;
  },
  // 获取统计表数据
  getPieData() {
    let data = this.get();
    const victory = data.grabThirty.victory + data.pushThirty.victory;
    const fail = data.grabThirty.fail + data.pushThirty.fail;
    const runaway = data.grabThirty.runaway + data.pushThirty.runaway;
    const total = victory + fail + runaway;
    if (total !== 0) {
      pieData[0].percent = Math.floor(victory / total * 10000) / 10000;
      pieData[1].percent = Math.floor(fail / total * 10000) / 10000;
      pieData[2].percent = Math.floor(runaway / total * 10000) / 10000;
    }
    return pieData;
  }
};

export default gameStatistics;
