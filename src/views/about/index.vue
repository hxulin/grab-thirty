<template>
  <div class="about">
    <van-nav-bar>
      <div slot="title">
        <van-icon class="title-icon" name="more-o"></van-icon>
        <span>关于</span>
      </div>
    </van-nav-bar>
    <van-panel title="项目说明" desc="基于 Vue 的前端练手项目，麻雀虽小，五脏俱全。">
      <div class="content">
        <p>源码：<a href="https://github.com/hxulin/grab-thirty">https://github.com/hxulin/grab-thirty</a></p>
        <p>仅供交流、学习、娱乐使用。</p>
      </div>
    </van-panel>
  </div>
</template>

<script>
  import { NavBar, Icon, Panel } from 'vant';
  export default {
    name: "About",
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Panel.name]: Panel
    },
  }
</script>

<style lang="scss" scoped>
  .about {
    height: calc(100vh - 50px);
    background-color: #EFEFEF;

    .title-icon {
      margin-right: 3px;
      color: #323233;
      position: relative;
      top: -2px
    }

    .van-panel {
      margin-top: 2px;
    }

    .van-hairline--top-bottom::after {
      border-width: 0;
    }

    .content {
      padding: 10px 16px;

      a {
        color: #00E;
      }
    }
  }
</style>
