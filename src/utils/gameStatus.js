import storage from './storage'


const game_status_key = 'in_game';

const gameStatus = {
  inProgress() {
    return storage.get(game_status_key) || false;
  },
  enter() {
    storage.set(game_status_key, true);
  },
  exit() {
    storage.remove(game_status_key);
  }
};

export default gameStatus;

