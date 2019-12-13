import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import gameStatus from './utils/gameStatus'
import { Dialog } from 'vant';

Date.prototype.format = function (pattern) {
  var fmt = pattern || 'yyyy-MM-dd HH:mm:ss';
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};

const menuRouters = ['/game', '/statistics', '/joke', '/about'];

router.beforeEach((to, from, next) => {

  let menuIndex = menuRouters.findIndex(item => item === to.fullPath);
  if (menuIndex > -1) {
    store.dispatch('SetMenuIndex', menuIndex);
  }

  if (from.fullPath === '/') {
    gameStatus.exit(-1);
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
        gameStatus.exit(-1);
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
