<template>
  <div class="joke">
    <van-nav-bar>
      <div slot="title">
        <van-icon class="title-icon" name="smile-comment-o"></van-icon>
        <span>开心一刻</span>
      </div>
    </van-nav-bar>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-panel v-for="item in list" :key="item" title="2019-12-12">
        <div>某人到商店买点钞机，挑了两台最贵的，同时问了一下老板为什么这种型号的贵一些，老板告诉他因为这是全智能语音型的。
          付款时他让老板就用这两台点钞机点钞，两台点钞机都报出了准确的数字，他认为语音功能还不错...</div>
      </van-panel>
    </van-list>
  </div>
</template>

<script>
  import { NavBar, Icon, List, Panel } from 'vant';
  export default {
    name: "Joke",
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [List.name]: List,
      [Panel.name]: Panel
    },
    data() {
      return {
        list: [],
        loading: false,
        finished: false
      }
    },
    methods: {
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .joke {
    height: calc(100vh - 50px);
    background-color: #EFEFEF;

    .title-icon {
      margin-right: 3px;
      color: #323233;
      position: relative;
      top: -2px
    }

    .van-list {
      margin-bottom: 50px;
    }

    .van-panel {
      margin-top: 2px;

      .van-panel__header {
        padding: 10px 16px 0;
      }

      .van-cell__title {
        font-size: 12px;
        color: #666;
      }

      .van-panel__content {
        padding: 12px 16px 25px;
        line-height: 1.5;
      }
    }

    .van-hairline--top-bottom::after {
      border-width: 0;
    }
  }
</style>
