import storage from './storage'

const game_statistics_key = 'game_statistics_data';

const gameStatistics = {
  get() {
    return storage.get(game_statistics_key);
  },
  set(value) {
    storage.set(game_statistics_key, value);
  }
};

export default gameStatistics;