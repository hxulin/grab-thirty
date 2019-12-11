import storage from './storage'
import gameStatistics from './gameStatistics'

const game_status_key = 'in_game';

const gameStatus = {
  inProgress() {
    return storage.get(game_status_key) || false;
  },
  enter(type) {
    gameStatistics.update(type);
    storage.set(game_status_key, true);
  },
  exit(type) {
    gameStatistics.update(type);
    storage.remove(game_status_key);
  }
};

export default gameStatus;
