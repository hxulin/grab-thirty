<template>
  <div class="game">
    <van-tabs v-model="active" :color="colors[active]">
      <van-tab title="抢三十">
        <div class="rule">
          <p>两个人轮流报数，每个人一次可以报一个或者两个数。从 1 开始报起，谁要是报到数字 30 就判谁赢。</p>
          <p>例如：如果甲报数 1 ，乙可以报数：2 或者 2、3；如果甲报数 1、2 ，乙可以报数：3 或者 3、4</p>
        </div>
      </van-tab>
      <van-tab title="推三十">
        <div class="rule">
          <p>游戏玩法和“抢三十”完全相同，判定输赢的条件是谁要是报到数字 30 就判谁输。</p>
        </div>
      </van-tab>
    </van-tabs>
    <van-button class="start-btn" icon="flag-o" :type="btnType[active]" @touchstart.stop="startGame">开始游戏</van-button>
  </div>
</template>

<script>
  import {Tabs, Tab, Button} from 'vant'
  export default {
    name: "Game",
    components: {
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
      [Button.name]: Button
    },
    data() {
      return {
        active: 0,
        gameRouters: ['/grab-thirty', '/push-thirty'],
        colors: ['#1989FA', '#07C160'],
        btnType: ['info', 'primary']
      }
    },
    methods: {
      startGame() {
        this.$router.push(this.gameRouters[this.active]);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .game {
    height: calc(100vh - 50px);
    position: relative;

    .rule {
      padding: 5px 20px;
      font-size: 18px;

      p {
        line-height: 1.5;
      }
    }

    .start-btn {
      position: absolute;
      bottom: 30px;
      left: 50%;
      margin-left: -54.9px;
    }
  }
</style>