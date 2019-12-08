import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import gameStatus from './utils/gameStatus'
import { Dialog } from 'vant';

const menuRouters = ['/game', '/statistics', '/joke', '/about'];

router.beforeEach((to, from, next) => {

  let menuIndex = menuRouters.findIndex(item => item === to.fullPath);
  if (menuIndex > -1) {
    store.dispatch('SetMenuIndex', menuIndex);
  }

  if (from.fullPath === '/') {
    gameStatus.exit();
    next();
  } else {
    if (gameStatus.inProgress()) {
      Dialog.confirm({
        message: '当前游戏尚未结束，离开页面将视为逃跑。',
        cancelButtonText: '强行结束',
        cancelButtonColor: 'red',
        confirmButtonText: '继续游戏'
      }).then(() => {
        // on confirm
        store.dispatch('SetMenuIndex', 0);
      }).catch(() => {
        // on cancels
        gameStatus.exit();
        router.replace(to);
        // next();
      });
    } else {
      next();
    }
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
