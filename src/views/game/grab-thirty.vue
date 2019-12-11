<template>
  <div class="grab-thirty">
    <van-nav-bar title="抢三十"></van-nav-bar>
    <div class="content">
      <van-panel title="电脑报数">
        <div class="computer">{{ computerText }}</div>
      </van-panel>
      <van-panel title="我报数（请选择）">
        <div class="person">
          <div v-if="personNumber > 30" class="failText">挑战失败。</div>
          <div v-else>
            <van-button type="info" @click="nextStep(personNumber + 1)">{{ personNumber }}</van-button>
            <van-button v-if="personNumber < 30" type="primary" @click="nextStep(personNumber + 2)">{{ personNumber }}、{{ personNumber + 1 }}</van-button>
          </div>
        </div>
      </van-panel>
    </div>
    <van-action-sheet v-model="show" :actions="actions" @select="startGame" cancel-text="退出游戏" @cancel="exitGame"
                      :close-on-click-action="true" :close-on-click-overlay="false" description="请选择谁先报数"></van-action-sheet>
  </div>
</template>

<script>
  import { NavBar, Panel, Button, Dialog, ActionSheet } from 'vant';
  import gameStatus from '@/utils/gameStatus'
  export default {
    name: "grab-thirty",
    components: {
      [NavBar.name]: NavBar,
      [Panel.name]: Panel,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
      [ActionSheet.name]: ActionSheet
    },
    data() {
      return {
        currentNumber: 0,
        computerText: '',
        personNumber: 0,
        show: false,
        actions: [
          { name: '我先手', index: 0 },
          { name: '电脑先手', index: 1 }
        ]
      }
    },
    mounted() {
      const startNumber = this.$route.params.startNumber;
      if (startNumber === undefined) {
        this.$router.replace('/');
        return;
      }
      this.$store.dispatch('SetMenuIndex', 0);
      // 进入游戏时设置逃跑状态
      gameStatus.enter(2);
      this.nextStep(startNumber);
    },
    methods: {
      // 下一步
      nextStep(currentNumber) {
        if (currentNumber === 31) {
          this.gameOver(0, '恭喜你，挑战成功。');
        } else {
          this.currentNumber = currentNumber;
          if (this.currentNumber > 0) {
            this.computerText = this.currentNumber;
            this.personNumber = this.currentNumber + 1;
            if (currentNumber >= 29) {
              this.gameOver(1, '很遗憾，挑战失败。');
            }
            if (this.currentNumber % 3 === 0) {
              return;
            }
            if ((this.currentNumber + 1) % 3 === 0) {
              this.computerText += '、' + (this.currentNumber + 1);
              this.personNumber ++;
              return;
            }
            if (this.currentNumber + Math.floor(Math.random() * 2) > this.currentNumber) {
              this.computerText += '、' + (this.currentNumber + 1);
              this.personNumber ++;
            }
          } else {
            this.computerText = '你先报数';
            this.personNumber = 1;
          }
        }
      },
      // 游戏结束
      gameOver(result, msg) {
        gameStatus.exit(result);
        Dialog.confirm({
          message: msg,
          cancelButtonText: '返回主页',
          confirmButtonText: '再来一局'
        }).then(() => {
          // on confirm
          this.show = true;
        }).catch(() => {
          // on cancels
          this.exitGame();
        });
      },
      // 再来一局
      startGame(item) {
        // 进入游戏时设置逃跑状态
        gameStatus.enter(2);
        this.nextStep(item.index);
      },
      // 退出游戏, 返回主页
      exitGame() {
        this.$router.replace('/');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .grab-thirty {
    height: calc(100vh - 50px);
    position: relative;
    background-color: #EFEFEF;

    .content {

      .van-panel {
        margin-top: 2px;
      }

      .van-cell {
        padding: 10px 16px 2px;

        .van-cell__title {
          color: #777;
        }
      }

      .computer {
        padding: 50px 16px;
        font-size: 30px;
        text-align: center;
        color: #555;
        font-weight: bold;
      }

      .person {
        padding: 50px 16px;
        text-align: center;
        height: 80px;

        .van-button__text {
          font-size: 30px;
          font-weight: bold;
        }

        .van-button {
          height: 80px;
          line-height: normal;

          &:first-child {
            margin-right: 20px;
          }
        }

        .van-button--normal {
          padding: 0;
          width: 145px;

          &:first-child {
            width: 95px;
          }
        }

        .failText {
          font-size: 20px;
          font-weight: bold;
          color: red;
          line-height: 80px;
        }
      }
    }
  }
</style>
