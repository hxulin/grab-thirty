import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router);

const routes = [{
  path: '',
  component: Layout,
  redirect: 'game',
  children: [{
    path: 'game',
    component: () => import('@/views/game')
  }, {
    path: 'grab-thirty',
    component: () => import('@/views/game/grab-thirty')
  }, {
    path: 'push-thirty',
    component: () => import('@/views/game/push-thirty')
  }, {
    path: 'statistics',
    component: () => import('@/views/statistics')
  }, {
    path: 'joke',
    component: () => import('@/views/joke')
  }, {
    path: 'about',
    component: () => import('@/views/about')
  }]
}];


export default new Router({
  routes
});
