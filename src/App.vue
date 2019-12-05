<template>
  <div id="app">
    <van-tabs v-model="active" color="#1989fa">
      <van-tab title="抢三十">
        <div>两个人轮流报数，每个人一次可以报一个或者两个数。从 1 开始报起，谁要是报到数字 30 就判谁赢。
          例如：如果甲报数 1 ；乙可以报数：2 或者 2、3
          如果甲报数 1、2 ；乙可以报数：3 或者 3、4</div>
      </van-tab>
      <van-tab title="推三十">内容 2</van-tab>
    </van-tabs>
    <van-button icon="flag-o" type="info" @touchstart.stop="show = !show">开始游戏</van-button>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="fire-o">小游戏</van-tabbar-item>
      <van-tabbar-item icon="smile-comment-o">开心一刻</van-tabbar-item>
      <van-tabbar-item icon="contact">个人中心</van-tabbar-item>
    </van-tabbar>

    <van-number-keyboard :show="show" safe-area-inset-bottom />

  </div>
</template>

<script>
  import {Tabs, Tab, Button, NumberKeyboard, Tabbar, TabbarItem} from 'vant'
  export default {
    name: 'app',
    data() {
      return {
        show: false,
        active: 0
      }
    },
    components: {
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
      [Button.name]: Button,
      [NumberKeyboard.name]: NumberKeyboard,
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem
    }
  }
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
</style>
