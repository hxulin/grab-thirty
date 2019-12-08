<template>
  <div class="statistics">
    <van-nav-bar>
      <div slot="title">
        <van-icon class="title-icon" name="bar-chart-o"></van-icon>
        <span>战况统计</span>
      </div>
    </van-nav-bar>
  </div>
</template>

<script>
  import { NavBar } from 'vant';
  import { Icon } from 'vant';
  export default {
    name: "Statistics",
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon
    },
  }
</script>

<style lang="scss" scoped>
  .statistics {
    height: calc(100vh - 50px);
    background-color: #EFEFEF;

    .title-icon {
      margin-right: 3px;
      color: #323233;
      position: relative;
      top: -2px
    }
  }
</style>
